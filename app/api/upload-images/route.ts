import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getAdminSession } from '@/lib/requireAdmin'
import { verifyManageAccess } from '@/lib/requireManage'

export const maxDuration = 60 // Allows for longer execution times on hobby plan

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'dummy-key'
)

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'wedding-images'

type UploadResult = {
    original: string
    350: string
    550: string
    750: string
    1200: string
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const files = formData.getAll('images') as File[]
        const weddingId = formData.get('weddingId') as string

        if (!weddingId) {
            return NextResponse.json({ error: 'Missing weddingId' }, { status: 400 })
        }

        // Sanitize weddingId (used in the storage path) to prevent path traversal.
        if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,80}$/.test(weddingId)) {
            return NextResponse.json({ error: 'weddingId không hợp lệ' }, { status: 400 })
        }

        // Authorization: if a couple with this slug already exists, only its
        // manager (or an admin) may upload into its gallery. Uploads during the
        // create flow (no couple yet) are allowed.
        {
            const { data: couple } = await supabaseAdmin
                .from('couples')
                .select('id')
                .eq('slug', weddingId)
                .maybeSingle()
            if (couple) {
                const [isAdmin, isManager] = await Promise.all([
                    getAdminSession(),
                    verifyManageAccess(couple.id),
                ])
                if (!isAdmin && !isManager) {
                    return NextResponse.json({ error: 'Không có quyền tải ảnh cho thiệp này' }, { status: 403 })
                }
            }
        }

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No images provided' }, { status: 400 })
        }

        if (files.length > 15) {
            return NextResponse.json({ error: 'Tối đa 15 ảnh mỗi lần tải lên' }, { status: 400 })
        }

        // Validate file types and sizes to prevent memory overflow and malicious files
        for (const file of files) {
            if (file.size > 15 * 1024 * 1024) {
                return NextResponse.json({ error: `File ${file.name} vượt quá giới hạn 15MB.` }, { status: 400 })
            }
            if (file.type && !file.type.startsWith('image/')) {
                return NextResponse.json({ error: `File ${file.name} không phải là định dạng ảnh hợp lệ.` }, { status: 400 })
            }
        }

        const results: UploadResult[] = []

        // Process images sequentially to avoid Vercel Serverless Function OOM (Out Of Memory)
        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(new Uint8Array(arrayBuffer))

            const uniqueId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(16).slice(2)}`

            const safeName = file.name
                .replace(/\.[^/.]+$/, "")
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9-]/g, '-')
                .replace(/\s+/g, '-')
                .toLowerCase()

            const processAndUpload = async (width: number | null, folder: string): Promise<string> => {
                let imageBuffer: any = buffer

                if (width) {
                    imageBuffer = await sharp(buffer as any)
                        .resize(width, null, { withoutEnlargement: true })
                        .webp({ quality: 85 })
                        .toBuffer()
                } else {
                    // For original, still convert to WebP to save space while preserving more detail for the gallery
                    imageBuffer = await sharp(buffer as any)
                        .resize(2400, null, { withoutEnlargement: true })
                        .webp({ quality: 88 })
                        .toBuffer()
                }

                const filePath = `weddings/${weddingId}/${folder}/${uniqueId}-${safeName}.webp`

                const { error } = await supabase.storage
                    .from(BUCKET_NAME)
                    .upload(filePath, imageBuffer, {
                        contentType: 'image/webp',
                        upsert: true
                    })

                if (error) {
                    throw new Error(`Failed to upload to ${folder}: ${error.message}`)
                }

                const { data: { publicUrl } } = supabase.storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(filePath)

                return publicUrl
            }

            const [original, s350, s550, s750, s1200] = await Promise.all([
                processAndUpload(null, 'original'),
                processAndUpload(350, 's350'),
                processAndUpload(550, 's550'),
                processAndUpload(750, 's750'),
                processAndUpload(1200, 's1200')
            ])

            results.push({
                original,
                '350': s350,
                '550': s550,
                '750': s750,
                '1200': s1200
            })
        }

        return NextResponse.json({ success: true, results })
    } catch (error: any) {
        console.error('Upload Error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
