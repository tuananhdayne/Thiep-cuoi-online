'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type MusicManagerProps = {
    coupleId: number
    initialMusicUrl: string | null
    initialMusicDelay: number | null
    initialMusicVolume: number | null
    initialMusicAutoplay: boolean | null
}

export default function MusicManager({
    coupleId,
    initialMusicUrl,
    initialMusicDelay,
    initialMusicVolume,
    initialMusicAutoplay
}: MusicManagerProps) {
    const [url, setUrl] = useState(initialMusicUrl || '')
    const [delay, setDelay] = useState(initialMusicDelay?.toString() || '15')
    const [volume, setVolume] = useState((initialMusicVolume ? initialMusicVolume * 100 : 30).toString())
    const [autoplay, setAutoplay] = useState(initialMusicAutoplay ?? true)

    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ type: '', text: '' })

        try {
            const payload = {
                music_url: url.trim() || null,
                music_delay: delay ? parseInt(delay, 10) : 15,
                music_volume: volume ? parseInt(volume, 10) / 100 : 0.3,
                music_autoplay: autoplay,
            }

            const { error } = await supabase
                .from('couples')
                .update(payload)
                .eq('id', coupleId)

            if (error) throw error

            setMessage({ type: 'success', text: 'Cập nhật nhạc nền thành công!' })
        } catch (error) {
            console.error(error)
            setMessage({ type: 'error', text: 'Có lỗi xảy ra khi lưu thiết lập.' })
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-4 bg-white rounded-3xl border border-amber-50 shadow-[0_20px_50px_rgba(92,65,35,0.08)] p-6">
            <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Nhạc nền</p>
                <h3 className="font-display text-2xl text-[#5b3a29]">Album Nhạc</h3>
                <p className="text-sm text-[#9a7d68]">Cài đặt nhạc nền tự động phát cho trang thiệp cưới.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#5b3a29] mb-1">
                        Link nhạc (MP3)
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Ví dụ: https://example.com/music.mp3 hoặc url từ supabase storage"
                        className="w-full rounded-xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#5b3a29] mb-1">
                            Thời gian chờ (giây)
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={delay}
                            onChange={(e) => setDelay(e.target.value)}
                            className="w-full rounded-xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                        />
                        <p className="text-xs mt-1 text-[#9a7d68]">Sau khi mở trang bao lâu thì phát nhạc.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5b3a29] mb-1">
                            Âm lượng ({volume}%)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="w-full mt-2 accent-[#c08a4b]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="music_autoplay"
                        checked={autoplay}
                        onChange={(e) => setAutoplay(e.target.checked)}
                        className="rounded border-[#eedfcc] bg-white text-[#f2c87c] focus:ring-[#f2c87c] w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="music_autoplay" className="text-sm font-medium text-[#5b3a29] cursor-pointer">
                        Tự động phát nhạc
                    </label>
                </div>

                {message.text && (
                    <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                        {message.text}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto rounded-full bg-[#f3e6d8] px-5 py-3 text-sm font-semibold text-[#5b3a29] shadow-sm transition hover:bg-[#e9d8c3] disabled:opacity-60"
                >
                    {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                </button>
            </form>
        </div>
    )
}
