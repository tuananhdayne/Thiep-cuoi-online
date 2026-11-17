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
    const theme = searchParams.get('theme') || 'burgundy-romance'
    const isEmbedded = searchParams.get('embedded') === '1'
    const isOpen = searchParams.get('open') === '1' || isEmbedded
    const [TemplateToRender, setTemplateToRender] = useState<React.ComponentType<any> | null>(null)
    const [couple, setCouple] = useState<Couple | null>(null)
    const [previewGallery, setPreviewGallery] = useState<GalleryItem[]>([])
    const [hasPreviewData, setHasPreviewData] = useState(false)

    const validTheme = supportedThemes.includes(theme as (typeof supportedThemes)[number])
        ? theme
        : 'burgundy-romance'

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

    // Curated theme-specific authentic bride & groom photos and info for demo
    const themeDemoProfiles: Record<
        string,
        {
            groom: string
            bride: string
            hero: string
            gallery: string[]
        }
    > = {
        'lotus-purity': {
            groom: 'Quang Dũng',
            bride: 'Mai Chi',
            hero: '/images/couples/wedding-couple-1.webp',
            gallery: [
                '/images/couples/wedding-couple-1.webp',
                '/images/couples/wedding-couple-2.webp',
                '/images/couples/wedding-couple-3.webp',
                '/images/couples/wedding-couple-4.webp',
                '/images/couples/wedding-couple-5.webp',
                '/images/couples/wedding-couple-6.webp',
            ],
        },
        'imperial-harmony': {
            groom: 'Minh Tuấn',
            bride: 'Hồng Hạnh',
            hero: '/images/couples/wedding-couple-7.webp',
            gallery: [
                '/images/couples/wedding-couple-7.webp',
                '/images/couples/wedding-couple-8.webp',
                '/images/couples/wedding-couple-9.webp',
                '/images/couples/wedding-couple-10.webp',
                '/images/couples/wedding-couple-11.webp',
                '/images/couples/wedding-couple-12.webp',
            ],
        },
        'burgundy-romance': {
            groom: 'Hoàng Long',
            bride: 'Bảo Ngọc',
            hero: '/images/couples/wedding-couple-14.webp',
            gallery: [
                '/images/couples/wedding-couple-14.webp',
                '/images/couples/wedding-couple-13.webp',
                '/images/couples/wedding-couple-15.webp',
                '/images/couples/wedding-couple-16.webp',
                '/images/couples/wedding-couple-17.webp',
                '/images/couples/wedding-couple-18.webp',
            ],
        },
        'noir-prestige': {
            groom: 'Trọng Hiếu',
            bride: 'Kim Cương',
            hero: '/images/couples/wedding-couple-13.webp',
            gallery: [
                '/images/couples/wedding-couple-13.webp',
                '/images/couples/wedding-couple-14.webp',
                '/images/couples/wedding-couple-24.webp',
                '/images/couples/wedding-couple-15.webp',
                '/images/couples/wedding-couple-16.webp',
                '/images/couples/wedding-couple-17.webp',
            ],
        },
        'sunset-blush': {
            groom: 'Gia Huy',
            bride: 'Thảo Vy',
            hero: '/images/couples/wedding-couple-19.webp',
            gallery: [
                '/images/couples/wedding-couple-19.webp',
                '/images/couples/wedding-couple-20.webp',
                '/images/couples/wedding-couple-21.webp',
                '/images/couples/wedding-couple-22.webp',
                '/images/couples/wedding-couple-23.webp',
                '/images/couples/wedding-couple-3.webp',
            ],
        },
        'crystal-luxury': {
            groom: 'Tuấn Kiệt',
            bride: 'Thanh Hằng',
            hero: '/images/couples/wedding-couple-16.webp',
            gallery: [
                '/images/couples/wedding-couple-16.webp',
                '/images/couples/wedding-couple-15.webp',
                '/images/couples/wedding-couple-17.webp',
                '/images/couples/wedding-couple-18.webp',
                '/images/couples/wedding-couple-21.webp',
                '/images/couples/wedding-couple-22.webp',
            ],
        },
        'golden-vintage': {
            groom: 'Đức Anh',
            bride: 'Khánh Linh',
            hero: '/images/couples/wedding-couple-15.webp',
            gallery: [
                '/images/couples/wedding-couple-15.webp',
                '/images/couples/wedding-couple-16.webp',
                '/images/couples/wedding-couple-17.webp',
                '/images/couples/wedding-couple-18.webp',
                '/images/couples/wedding-couple-2.webp',
                '/images/couples/wedding-couple-3.webp',
            ],
        },
        'spring-garden': {
            groom: 'Văn Khoa',
            bride: 'Nhã Uyên',
            hero: '/images/couples/wedding-couple-18.webp',
            gallery: [
                '/images/couples/wedding-couple-18.webp',
                '/images/couples/wedding-couple-17.webp',
                '/images/couples/wedding-couple-15.webp',
                '/images/couples/wedding-couple-4.webp',
                '/images/couples/wedding-couple-5.webp',
                '/images/couples/wedding-couple-6.webp',
            ],
        },
        'ocean-breeze': {
            groom: 'Hải Đăng',
            bride: 'Bích Ngân',
            hero: '/images/couples/wedding-couple-17.webp',
            gallery: [
                '/images/couples/wedding-couple-17.webp',
                '/images/couples/wedding-couple-18.webp',
                '/images/couples/wedding-couple-15.webp',
                '/images/couples/wedding-couple-21.webp',
                '/images/couples/wedding-couple-22.webp',
                '/images/couples/wedding-couple-23.webp',
            ],
        },
        'lavender-dream': {
            groom: 'Nhật Nam',
            bride: 'Hà My',
            hero: '/images/couples/wedding-couple-20.webp',
            gallery: [
                '/images/couples/wedding-couple-20.webp',
                '/images/couples/wedding-couple-19.webp',
                '/images/couples/wedding-couple-21.webp',
                '/images/couples/wedding-couple-22.webp',
                '/images/couples/wedding-couple-23.webp',
                '/images/couples/wedding-couple-24.webp',
            ],
        },
    }

    const currentProfile = themeDemoProfiles[validTheme] || themeDemoProfiles['burgundy-romance']

    // Mock Data for Demo (fallback)
    const mockCouple: Couple = couple || {
        id: 0,
        slug: 'demo',
        bride_name: currentProfile.bride,
        groom_name: currentProfile.groom,
        hero_image: currentProfile.hero,
        intro_description: 'Cùng nhau bắt đầu một chương mới của cuộc đời. Sự hiện diện của quý khách là niềm vinh hạnh lớn nhất của chúng tôi.',
        wedding_date: '2026-12-28',
        wedding_time: '18:00',
        location: 'Trung tâm Hội nghị Tiệc cưới The Grand Palace',
        address: 'Quận 1, TP. HCM',
        theme: validTheme,
    }

    const mockLocations = {
        id: '1',
        couple_id: couple?.id?.toString() || '0',
        bride_event_title: couple?.bride_event_title || 'Lễ Vu Quy (Nhà Gái)',
        bride_event_date: couple?.bride_event_date || '2026-12-27',
        bride_event_time: couple?.bride_event_time || '09:00',
        bride_location: couple?.bride_location || 'Tư Gia Nhà Gái',
        bride_address: couple?.bride_address || '123 Đường Hoa Hồng, Phường Bến Nghé, Quận 1, TP. HCM',
        bride_google_map_embed: couple?.bride_google_map_embed || '',
        groom_event_title: couple?.groom_event_title || 'Lễ Thành Hôn (Nhà Trai)',
        groom_event_date: couple?.groom_event_date || '2026-12-28',
        groom_event_time: couple?.groom_event_time || '18:00',
        groom_location: couple?.groom_location || 'Trung tâm Hội nghị The Grand Palace',
        groom_address: couple?.groom_address || '456 Đại lộ Hạnh Phúc, Phường Tân Phú, Quận 7, TP. HCM',
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

    const defaultGallery: GalleryItem[] = currentProfile.gallery.map((imgUrl, i) => ({
        id: i + 1,
        image_url: imgUrl,
        sort_order: i + 1,
    }))
    const mockGallery: GalleryItem[] = hasPreviewData ? previewGallery : defaultGallery

    const mockWishes: Wish[] = [
        { id: 1, name: 'Hội bạn thân', message: 'Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé!', created_at: '2026-11-15T10:00:00.000Z' },
        { id: 2, name: 'Đồng nghiệp', message: 'Mãi mãi yêu thương và đồng hành cùng nhau nhé anh chị.', created_at: '2026-11-14T15:30:00.000Z' },
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
                defaultOpen={isOpen}
            />

            {/* Floating action bar to choose template, shown only when not embedded in an iframe */}
            {!isEmbedded && (
                <div className="fixed top-3 inset-x-3 sm:inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[740px] z-[9999] bg-stone-900/95 text-stone-100 backdrop-blur-md border border-amber-500/30 px-3.5 py-2.5 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 sm:gap-3 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                            <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-amber-300 font-semibold shrink-0">Xem thử:</span>
                            <span className="text-xs sm:text-sm font-bold text-white font-display truncate">{getThemeDisplayName(theme)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <Link
                                href="/"
                                className="text-xs text-stone-300 hover:text-white transition px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-stone-800"
                            >
                                Trang chủ
                            </Link>
                            <Link
                                href={`/create?theme=${theme}`}
                                className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full shadow transition hover:brightness-110 active:scale-95 whitespace-nowrap"
                            >
                                Chọn mẫu này
                            </Link>
                        </div>
                    </div>
                    {/* Quick switch tabs for 10 Chung Đôi templates */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar text-[11px] border-t border-white/10">
                        {[
                            { key: 'burgundy-romance', label: '1. Đỏ Rượu' },
                            { key: 'imperial-harmony', label: '2. Song Hỷ Đỏ' },
                            { key: 'spring-garden', label: '3. Vườn Xuân' },
                            { key: 'golden-vintage', label: '4. Vintage Nâu' },
                            { key: 'sunset-blush', label: '5. Tơ Duyên Hồng' },
                            { key: 'crystal-luxury', label: '6. Cẩm Thạch Vàng' },
                            { key: 'ocean-breeze', label: '7. Biển Xanh' },
                            { key: 'lavender-dream', label: '8. Oải Hương Tím' },
                            { key: 'noir-prestige', label: '9. Baroque Dạ Vũ' },
                            { key: 'lotus-purity', label: '10. Sen Trắng' },
                        ].map((item) => (
                            <Link
                                key={item.key}
                                href={`/demo?theme=${item.key}`}
                                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                                    theme === item.key
                                        ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
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
