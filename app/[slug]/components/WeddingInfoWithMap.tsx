'use client'

import { useState } from 'react'
import Reveal from './Reveal'

export type LocationInfo = {
    title?: string | null
    date?: string | null
    time?: string | null
    location?: string | null
    address?: string | null
    mapEmbedUrl?: string | null
}

export type WeddingInfoWithMapProps = {
    brideInfo: LocationInfo
    groomInfo: LocationInfo
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

export default function WeddingInfoWithMap({ brideInfo, groomInfo }: WeddingInfoWithMapProps) {
    const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('bride')

    const currentInfo = activeTab === 'groom' ? groomInfo : brideInfo
    const mapUrl = extractMapSrc(currentInfo.mapEmbedUrl)

    return (
        <section className="py-16 px-6" id="wedding-info">
            <div className="max-w-5xl mx-auto">
                <Reveal className="space-y-8">
                    <div className="text-center space-y-2">
                        <p className="text-xs uppercase tracking-[0.32em] text-[#c08a4b]">Địa điểm tổ chức</p>
                        <h2 className="font-display text-3xl md:text-4xl text-[#5b3a29]">Save the Date</h2>
                        <p className="text-sm text-[#7b5e4b]">Hẹn gặp bạn trong ngày trọng đại của chúng tôi.</p>
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-white/50 backdrop-blur p-1.5 rounded-full inline-flex border border-amber-100 shadow-sm">
                            <button
                                onClick={() => setActiveTab('bride')}
                                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'bride'
                                        ? 'bg-gradient-to-r from-[#c08a4b] to-[#e6b877] text-white shadow-md'
                                        : 'text-[#7b5e4b] hover:text-[#5b3a29]'
                                    }`}
                            >
                                Nhà Gái
                            </button>
                            <button
                                onClick={() => setActiveTab('groom')}
                                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'groom'
                                        ? 'bg-gradient-to-r from-[#c08a4b] to-[#e6b877] text-white shadow-md'
                                        : 'text-[#7b5e4b] hover:text-[#5b3a29]'
                                    }`}
                            >
                                Nhà Trai
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-[32px] shadow-[0_30px_60px_rgba(91,58,41,0.08)] border border-amber-50 overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-10 flex flex-col justify-center space-y-8">
                                <div>
                                    <h3 className="font-display text-2xl text-[#5b3a29] mb-2">
                                        {currentInfo.title || (activeTab === 'groom' ? 'Tiệc cưới nhà Trai' : 'Tiệc cưới nhà Gái')}
                                    </h3>
                                    <div className="h-px w-16 bg-gradient-to-r from-[#c08a4b] to-transparent mb-6"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                                            <span className="text-lg">📅</span>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-[#c08a4b] mb-1 font-medium">Thời gian</p>
                                            <p className="font-medium text-[#5b3a29]">{formatDate(currentInfo.date) || 'Đang cập nhật'}</p>
                                            {currentInfo.time && <p className="text-[15px] text-[#7b5e4b] mt-0.5">{formatTime(currentInfo.time)}</p>}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                                            <span className="text-lg">📍</span>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-[#c08a4b] mb-1 font-medium">Địa điểm</p>
                                            <p className="font-medium text-[#5b3a29]">{currentInfo.location || 'Đang cập nhật'}</p>
                                            {currentInfo.address && <p className="text-[15px] text-[#7b5e4b] mt-0.5">{currentInfo.address}</p>}
                                        </div>
                                    </div>
                                </div>

                                {mapUrl && (
                                    <div className="pt-2">
                                        <a
                                            href={mapUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-[15px] font-medium text-white bg-gradient-to-r from-[#c08a4b] to-[#e6b877] px-6 py-3 rounded-full shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                                        >
                                            Mở trên Google Maps
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="h-[300px] md:h-auto bg-amber-50 relative">
                                {mapUrl ? (
                                    <iframe
                                        src={mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    ></iframe>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-[#c08a4b] bg-amber-50/50">
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
