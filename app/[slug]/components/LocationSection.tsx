'use client'

import { useState } from 'react'
import Reveal from './Reveal'

export type LocationInfo = {
    title?: string | null
    location?: string | null
    address?: string | null
    mapEmbedUrl?: string | null
}

export type LocationSectionProps = {
    brideInfo: LocationInfo
    groomInfo: LocationInfo
    weddingDate?: string | null
    weddingTime?: string | null
}

const formatDate = (value?: string | null) => {
    if (!value) return ''
    return new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date(value))
}

const formatTime = (value?: string | null) => {
    if (!value) return ''
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date(`1970-01-01T${value}+07:00`))
}

const extractMapSrc = (value?: string | null) => {
    if (!value) return null
    const iframeMatch = value.match(/<iframe[^>]*src=["']([^"']+)["']/i)
    if (iframeMatch?.[1]) return iframeMatch[1].trim()
    const trimmed = value.trim()
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    return null
}

export default function LocationSection({ brideInfo, groomInfo, weddingDate, weddingTime }: LocationSectionProps) {
    const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('bride')

    const currentInfo = activeTab === 'groom' ? groomInfo : brideInfo
    const mapUrl = extractMapSrc(currentInfo.mapEmbedUrl)
    
    // If it's an embed URL, browsing directly to it will cause "Refused to connect" 
    // We construct a search query instead to open the native Maps app.
    const isEmbed = mapUrl?.includes('/embed')
    const externalMapUrl = isEmbed
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${currentInfo.location || ''} ${currentInfo.address || ''}`.trim()
        )}`
        : mapUrl

    return (
        <section className="py-16 px-6 bg-bg-alt" id="location">
            <div className="max-w-4xl mx-auto">
                <Reveal className="space-y-10">
                    <div className="text-center space-y-3">
                        <p className="text-xs uppercase tracking-[0.32em] text-accent">Địa điểm tổ chức</p>
                        <h2 className="font-display text-4xl md:text-5xl text-primary">Sự kiện Cưới</h2>
                        <p className="text-sm text-primary-light">Sự hiện diện của bạn là vinh hạnh cho chúng tôi.</p>
                        <div className="pt-4 flex flex-col items-center justify-center gap-2">
                            {(weddingDate || weddingTime) && (
                                <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white shadow-sm border border-amber-50">
                                    <span className="text-lg text-accent">📅</span>
                                    <p className="font-medium text-primary md:text-lg">
                                        {formatDate(weddingDate)} {weddingTime && <span className="mx-2 text-accent-light">|</span>} {weddingTime && formatTime(weddingTime)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-white p-1.5 rounded-full inline-flex border border-amber-100 shadow-sm relative overflow-hidden">
                            <div
                                className={`absolute inset-y-1.5 w-[120px] rounded-full bg-gradient-to-r from-accent to-accent-light shadow-md transition-all duration-300 ease-out`}
                                style={{ left: activeTab === 'bride' ? '6px' : 'calc(100% - 126px)' }}
                            />
                            <button
                                onClick={() => setActiveTab('bride')}
                                className={`relative z-10 w-[120px] py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'bride'
                                    ? 'text-white'
                                    : 'text-primary-light hover:text-primary'
                                    }`}
                            >
                                Nhà Gái
                            </button>
                            <button
                                onClick={() => setActiveTab('groom')}
                                className={`relative z-10 w-[120px] py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'groom'
                                    ? 'text-white'
                                    : 'text-primary-light hover:text-primary'
                                    }`}
                            >
                                Nhà Trai
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(91,58,41,0.06)] border border-border-light overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12 flex flex-col justify-center space-y-8 bg-gradient-to-br from-white to-accent-bg/30">
                                <div>
                                    <h3 className="font-display text-3xl text-primary mb-3">
                                        {currentInfo.title || (activeTab === 'groom' ? 'Tiệc cưới nhà Trai' : 'Tiệc cưới nhà Gái')}
                                    </h3>
                                    <div className="h-0.5 w-16 bg-accent mb-6 rounded-full"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-full bg-accent-pale/80 flex items-center justify-center shrink-0 border border-border-light text-accent">
                                            <span className="text-xl">📍</span>
                                        </div>
                                        <div>
                                            <p className="text-[11px] uppercase tracking-wider text-accent mb-1 font-semibold">Địa điểm</p>
                                            <p className="font-medium text-primary text-base">{currentInfo.location || 'Đang cập nhật'}</p>
                                            {currentInfo.address && <p className="text-sm text-primary-light mt-1 leading-relaxed">{currentInfo.address}</p>}
                                        </div>
                                    </div>
                                </div>

                                {mapUrl && (
                                    <div className="pt-4">
                                        <a
                                            href={externalMapUrl || '#'}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 w-full md:w-auto text-sm font-semibold text-white bg-gradient-to-r from-accent to-accent-light px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(192,138,75,0.3)] transition-all hover:-translate-y-0.5"
                                        >
                                            Xem trên Google Maps
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="h-[350px] md:h-auto bg-accent-pale relative">
                                {mapUrl ? (
                                    <iframe
                                        src={mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        suppressHydrationWarning
                                        className="absolute inset-0 w-full h-full object-cover"
                                    ></iframe>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-accent bg-accent-pale/50">
                                        <div className="text-center space-y-3">
                                            <span className="text-4xl">🗺️</span>
                                            <p className="text-sm font-medium">Chưa có bản đồ</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
