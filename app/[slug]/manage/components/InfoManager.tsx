'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function InfoManager({ couple }: { couple: any }) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Form state
    const [form, setForm] = useState({
        bride_name: couple.bride_name || '',
        groom_name: couple.groom_name || '',
        wedding_date: couple.wedding_date || '',
        wedding_time: couple.wedding_time || '',
        intro_description: couple.intro_description || '',

        bride_event_title: couple.bride_event_title || 'Lễ Vu Quy',
        bride_location: couple.bride_location || '',
        bride_address: couple.bride_address || '',
        bride_google_map_embed: couple.bride_google_map_embed || '',

        groom_event_title: couple.groom_event_title || 'Lễ Thành Hôn',
        groom_location: couple.groom_location || '',
        groom_address: couple.groom_address || '',
        groom_google_map_embed: couple.groom_google_map_embed || '',
    })

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const { error: updateError } = await supabase
                .from('couples')
                .update(form)
                .eq('id', couple.id)

            if (updateError) throw updateError

            setIsEditing(false)
            router.refresh() // Refresh the page to reflect new generic data
        } catch (err: any) {
            console.error('Lỗi khi cập nhật thông tin:', err)
            setError(err.message || 'Có lỗi xảy ra khi lưu thông tin.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isEditing) {
        return (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-amber-50">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-2xl text-[#5b3a29]">Thông Tin Cơ Bản</h2>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-[#f8f4ef] text-[#c08a4b] text-sm font-medium rounded-xl hover:bg-[#f0e6da] transition-colors"
                    >
                        Chỉnh sửa
                    </button>
                </div>
                <p className="text-sm text-[#9a7d68] mb-6">Thay đổi thông tin hiển thị trên thiệp cưới của bạn.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#fcfbfa] rounded-2xl border border-amber-50/50">
                        <p className="text-xs uppercase tracking-wider text-[#c08a4b] mb-1">Tên Cô Dâu & Chú Rể</p>
                        <p className="font-medium text-[#5b3a29]">{couple.bride_name} ♥ {couple.groom_name}</p>
                    </div>
                    <div className="p-4 bg-[#fcfbfa] rounded-2xl border border-amber-50/50">
                        <p className="text-xs uppercase tracking-wider text-[#c08a4b] mb-1">Thời Gian Tổ Chức</p>
                        <p className="font-medium text-[#5b3a29]">
                            {couple.wedding_time && `${couple.wedding_time} | `}
                            {couple.wedding_date && new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(couple.wedding_date))}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-amber-100 ring-4 ring-amber-50/30">
            <h2 className="font-display text-2xl text-[#5b3a29] mb-6">Cập nhật Thông Tin Cơ Bản</h2>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm border border-red-100">
                    {error}
                </div>
            )}

            <div className="space-y-8">
                {/* 1. Tên */}
                <div className="space-y-4">
                    <h3 className="font-medium text-[#8c6f5a] border-b border-amber-50 pb-2">1. Nhân vật chính</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Tên Cô dâu</label>
                            <input
                                type="text"
                                value={form.bride_name}
                                onChange={(e) => handleChange('bride_name', e.target.value)}
                                className="w-full px-4 py-3 bg-[#fcfbfa] border border-amber-100 rounded-xl text-sm focus:ring-2 focus:ring-[#c08a4b]/20 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Tên Chú rể</label>
                            <input
                                type="text"
                                value={form.groom_name}
                                onChange={(e) => handleChange('groom_name', e.target.value)}
                                className="w-full px-4 py-3 bg-[#fcfbfa] border border-amber-100 rounded-xl text-sm focus:ring-2 focus:ring-[#c08a4b]/20 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Dòng giới thiệu chung */}
                <div className="space-y-4">
                    <h3 className="font-medium text-[#8c6f5a] border-b border-amber-50 pb-2">2. Thông điệp tình yêu</h3>
                    <div className="space-y-1.5">
                        <textarea
                            value={form.intro_description}
                            onChange={(e) => handleChange('intro_description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-[#fcfbfa] border border-amber-100 rounded-xl text-sm focus:ring-2 focus:ring-[#c08a4b]/20 outline-none resize-none"
                        />
                    </div>
                </div>

                {/* 3. Thời gian chung */}
                <div className="space-y-4">
                    <h3 className="font-medium text-[#8c6f5a] border-b border-amber-50 pb-2">3. Thời gian chung</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Ngày cưới</label>
                            <input
                                type="date"
                                value={form.wedding_date}
                                onChange={(e) => handleChange('wedding_date', e.target.value)}
                                className="w-full px-4 py-3 bg-[#fcfbfa] border border-amber-100 rounded-xl text-sm focus:ring-2 focus:ring-[#c08a4b]/20 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Giờ cử hành</label>
                            <input
                                type="time"
                                value={form.wedding_time}
                                onChange={(e) => handleChange('wedding_time', e.target.value)}
                                className="w-full px-4 py-3 bg-[#fcfbfa] border border-amber-100 rounded-xl text-sm focus:ring-2 focus:ring-[#c08a4b]/20 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Nhà gái */}
                <div className="space-y-4">
                    <h3 className="font-medium text-[#8c6f5a] border-b border-amber-50 pb-2">4. Sự kiện Nhà Gái</h3>
                    <div className="space-y-4 bg-[#fcfbfa] p-4 rounded-2xl border border-amber-50/50">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Tên sự kiện (VD: Lễ Vu Quy)</label>
                            <input
                                type="text"
                                value={form.bride_event_title}
                                onChange={(e) => handleChange('bride_event_title', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Tên địa điểm (Nhà hàng / Tư gia)</label>
                            <input
                                type="text"
                                value={form.bride_location}
                                onChange={(e) => handleChange('bride_location', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Địa chỉ chi tiết</label>
                            <input
                                type="text"
                                value={form.bride_address}
                                onChange={(e) => handleChange('bride_address', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Link/Mã nhúng Google Maps</label>
                            <textarea
                                value={form.bride_google_map_embed}
                                onChange={(e) => handleChange('bride_google_map_embed', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 5. Nhà trai */}
                <div className="space-y-4">
                    <h3 className="font-medium text-[#8c6f5a] border-b border-amber-50 pb-2">5. Sự kiện Nhà Trai</h3>
                    <div className="space-y-4 bg-[#fcfbfa] p-4 rounded-2xl border border-amber-50/50">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Tên sự kiện (VD: Lễ Thành Hôn)</label>
                            <input
                                type="text"
                                value={form.groom_event_title}
                                onChange={(e) => handleChange('groom_event_title', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Tên địa điểm (Nhà hàng / Tư gia)</label>
                            <input
                                type="text"
                                value={form.groom_location}
                                onChange={(e) => handleChange('groom_location', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Địa chỉ chi tiết</label>
                            <input
                                type="text"
                                value={form.groom_address}
                                onChange={(e) => handleChange('groom_address', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#5b3a29]">Link/Mã nhúng Google Maps</label>
                            <textarea
                                value={form.groom_google_map_embed}
                                onChange={(e) => handleChange('groom_google_map_embed', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 bg-white border border-amber-100 rounded-xl text-sm outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-amber-50">
                <button
                    onClick={() => {
                        setIsEditing(false)
                        setError(null)
                    }}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl font-medium text-[#8c6f5a] hover:bg-[#f8f4ef] transition-colors disabled:opacity-50"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-8 py-2.5 bg-[#c08a4b] text-white rounded-xl font-medium shadow-md shadow-[#c08a4b]/20 hover:bg-[#b07d43] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Đang lưu...</span>
                        </>
                    ) : (
                        'Lưu thay đổi'
                    )}
                </button>
            </div>
        </div>
    )
}
