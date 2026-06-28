"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { Couple, GalleryItem, Wish } from '../[slug]/templates/types'
import { loadTemplate, supportedThemes, getThemeDisplayName } from '../[slug]/templates/templateLoader'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const getPreviewImageUrl = (item: unknown) => {
    if (typeof item === 'string') return item
    if (!item || typeof item !== 'object') return ''

    const image = item as { original?: unknown; url?: unknown }
    if (typeof image.original === 'string') return image.original
    if (typeof image.url === 'string') return image.url
    return ''
}

function DemoPageContent() {
    const searchParams = useSearchParams()
    const theme = searchParams.get('theme') || 'classic'
    const isEmbedded = searchParams.get('embedded') === '1'
    const [TemplateToRender, setTemplateToRender] = useState<React.ComponentType<any> | null>(null)
    const [couple, setCouple] = useState<Couple | null>(null)
    const [previewGallery, setPreviewGallery] = useState<GalleryItem[]>([])
    const [hasPreviewData, setHasPreviewData] = useState(false)

    const validTheme = supportedThemes.includes(theme as (typeof supportedThemes)[number])
        ? theme
        : 'classic'

    useEffect(() => {
        let active = true

        // Load template. Wrap setState so React does not treat component as a state updater function.
        loadTemplate(validTheme).then((loaded) => {
            if (!active) return

            const component =
                typeof loaded === 'function'
                    ? (loaded as React.ComponentType<any>)
                    : loaded && typeof loaded === 'object' && 'default' in (loaded as any)
                        ? ((loaded as any).default as React.ComponentType<any>)
                        : null

            if (component) {
                // Wrap in function so React stores the component value,
                // not treat it as a functional state updater.
                setTemplateToRender(() => component)
            } else {
                setTemplateToRender(null)
            }
        })

        return () => {
            active = false
        }
    }, [validTheme])

    useEffect(() => {
        const receivePreviewData = (event: MessageEvent) => {
            if (
                event.origin !== window.location.origin ||
                event.source !== window.parent ||
                event.data?.type !== 'wedding-preview-data'
            ) {
                return
            }

            const data = event.data.payload
            if (!data?.couple) return

            setHasPreviewData(true)
            setCouple({
                ...data.couple,
                theme: validTheme,
            })

            const mapped = Array.isArray(data.images)
                ? data.images
                    .map((item: unknown, index: number) => {
                        const imageUrl = getPreviewImageUrl(item)
                        if (!imageUrl) return null
                        return {
                            id: index + 1,
                            image_url: imageUrl,
                        } as GalleryItem
                    })
                    .filter(Boolean) as GalleryItem[]
                : []

            setPreviewGallery(mapped)
        }

        window.addEventListener('message', receivePreviewData)
        return () => window.removeEventListener('message', receivePreviewData)
    }, [validTheme])

    // Mock Data for Demo (fallback)
    const mockCouple: Couple = couple || {
        id: 0,
        slug: 'demo',
        bride_name: 'Ngọc Lan',
        groom_name: 'Minh Khang',
        intro_description: 'Cùng nhau bắt đầu một chương mới của cuộc đời. Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi.',
        wedding_date: '2025-12-25',
        wedding_time: '18:00',
        location: 'Trung tâm Tiệc cưới The Grand',
        address: 'Quận 1, TP. HCM',
        theme: validTheme,
    }

    const mockLocations = {
        id: '1',
        couple_id: couple?.id?.toString() || '0',
        bride_event_title: couple?.bride_event_title || 'Lễ Vu Quy',
        bride_event_date: couple?.bride_event_date || '2025-12-24',
        bride_event_time: couple?.bride_event_time || '09:00',
        bride_location: couple?.bride_location || 'Tư Gia Nhà Gái',
        bride_address: couple?.bride_address || '123 Đường Hoa Hồng, Quận 1, TP. HCM',
        bride_google_map_embed: couple?.bride_google_map_embed || '',
        groom_event_title: couple?.groom_event_title || 'Tiệc Cưới',
        groom_event_date: couple?.groom_event_date || '2025-12-25',
        groom_event_time: couple?.groom_event_time || '18:00',
        groom_location: couple?.groom_location || 'Trung tâm Hội nghị The Grand',
        groom_address: couple?.groom_address || '456 Đại lộ Hạnh Phúc, Quận 7, TP. HCM',
        groom_google_map_embed: couple?.groom_google_map_embed || ''
    }

    const mockGift = {
        id: 1,
        couple_id: couple?.id || 0,
        is_enabled: couple?.gift_enabled !== false,
        groom_bank_name: couple?.groom_bank_name || 'Vietcombank',
        groom_bank_holder: couple?.groom_bank_holder || 'NGUYEN MINH KHANG',
        groom_bank_account: couple?.groom_bank_account || '9948240614',
        groom_bank_qr: couple?.groom_bank_qr || 'https://img.vietqr.io/image/VCB-9948240614-compact.png',
        bride_bank_name: couple?.bride_bank_name || 'Vietcombank',
        bride_bank_holder: couple?.bride_bank_holder || 'TRAN NGOC LAN',
        bride_bank_account: couple?.bride_bank_account || '1062395400',
        bride_bank_qr: couple?.bride_bank_qr || 'https://img.vietqr.io/image/VCB-1062395400-compact.png',
    }

    const locationsToRender = hasPreviewData
        ? {
            id: 'preview',
            couple_id: couple?.id?.toString() || '0',
            bride_event_title: couple?.bride_event_title || '',
            bride_event_date: couple?.bride_event_date || '',
            bride_event_time: couple?.bride_event_time || '',
            bride_location: couple?.bride_location || '',
            bride_address: couple?.bride_address || '',
            bride_google_map_embed: couple?.bride_google_map_embed || '',
            groom_event_title: couple?.groom_event_title || '',
            groom_event_date: couple?.groom_event_date || '',
            groom_event_time: couple?.groom_event_time || '',
            groom_location: couple?.groom_location || '',
            groom_address: couple?.groom_address || '',
            groom_google_map_embed: couple?.groom_google_map_embed || '',
        }
        : mockLocations

    const giftToRender = hasPreviewData
        ? {
            id: 0,
            couple_id: couple?.id || 0,
            is_enabled: couple?.gift_enabled === true,
            groom_bank_name: couple?.groom_bank_name || '',
            groom_bank_holder: couple?.groom_bank_holder || '',
            groom_bank_account: couple?.groom_bank_account || '',
            groom_bank_qr: couple?.groom_bank_qr || '',
            bride_bank_name: couple?.bride_bank_name || '',
            bride_bank_holder: couple?.bride_bank_holder || '',
            bride_bank_account: couple?.bride_bank_account || '',
            bride_bank_qr: couple?.bride_bank_qr || '',
        }
        : mockGift

    const defaultGallery: GalleryItem[] = [
        { id: 1, image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=88' },
        { id: 2, image_url: 'https://images.unsplash.com/photo-1529633965402-3b5bf2e4f9b1?auto=format&fit=crop&w=1400&q=85' },
        { id: 3, image_url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1400&q=85' },
        { id: 4, image_url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85' },
    ]
    const mockGallery: GalleryItem[] = hasPreviewData ? previewGallery : defaultGallery

    const mockWishes: Wish[] = [
        { id: 1, name: 'Hội bạn thân', message: 'Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé!', created_at: new Date().toISOString() },
        { id: 2, name: 'Đồng nghiệp', message: 'Mãi mãi yêu thương và đồng hành cùng nhau nhé anh chị.', created_at: new Date(Date.now() - 86400000).toISOString() },
    ]

    if (!TemplateToRender) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f3ec] text-[#8c7161] font-semibold text-sm">
                Đang tải giao diện...
            </div>
        )
    }

    const ActiveTemplate = TemplateToRender

    return (
        <main className="relative">
            <ActiveTemplate
                couple={mockCouple}
                gallery={mockGallery}
                wishes={mockWishes}
                weddingGift={giftToRender}
                locations={locationsToRender}
            />

            {/* Floating action bar to choose template, shown only when not embedded in an iframe */}
            {!isEmbedded && (
                <div className="fixed top-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-[9999] bg-white/95 backdrop-blur-md border border-[#ad7748]/20 px-5 py-3 rounded-2xl shadow-[0_15px_45px_rgba(75,48,36,0.18)] flex items-center justify-between gap-4 text-[#3c2921] animate-fade-in-up">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                        <span className="text-[10px] uppercase tracking-wider text-[#ad7547] font-semibold">Đang xem thử</span>
                        <span className="text-sm font-semibold font-display">{getThemeDisplayName(theme)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="text-xs font-semibold text-[#8c7161] hover:text-[#513426] transition px-3 py-2 rounded-lg hover:bg-gray-100/60"
                        >
                            Quay lại
                        </Link>
                        <Link
                            href={`/create?theme=${theme}`}
                            className="bg-[#513426] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-[0_4px_12px_rgba(81,52,38,0.2)] transition hover:bg-[#684531] hover:-translate-y-0.5"
                        >
                            Chọn mẫu này
                        </Link>
                    </div>
                </div>
            )}
        </main>
    )
}

export default function DemoPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DemoPageContent />
        </Suspense>
    )
}
