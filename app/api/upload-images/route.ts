import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 60 // Allows for longer execution times on hobby plan

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No images provided' }, { status: 400 })
        }

        if (files.length > 15) {
            return NextResponse.json({ error: 'Maximum 15 images allowed' }, { status: 400 })
        }

        const uploadPromises = files.map(async (file): Promise<UploadResult> => {
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
                        .webp({ quality: 75 })
                        .toBuffer()
                } else {
                    // For original, still convert to WebP to save space and cap width at 1600 as requested
                    imageBuffer = await sharp(buffer as any)
                        .resize(1600, null, { withoutEnlargement: true })
                        .webp({ quality: 75 })
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

            return {
                original,
                '350': s350,
                '550': s550,
                '750': s750,
                '1200': s1200
            }
        })

        const results = await Promise.all(uploadPromises)

        return NextResponse.json({ success: true, results })
    } catch (error: any) {
        console.error('Upload Error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
