'use client'

import { useEffect, useRef, useState } from 'react'

type MusicManagerProps = {
    coupleId: string | number
    initialMusicUrl: string | null
    initialMusicDelay: number | null
    initialMusicVolume: number | null
    initialMusicAutoplay: boolean | null
}

type Track = { name: string; url: string }

function prettyName(name: string) {
    return name.replace(/\.[^/.]+$/, '')
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

    // Shared music library (from the wedding-music bucket).
    const [tracks, setTracks] = useState<Track[]>([])
    const [loadingTracks, setLoadingTracks] = useState(true)
    const [tracksError, setTracksError] = useState('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        let active = true
        fetch('/api/manage/music-list')
            .then((r) => r.json())
            .then((d) => {
                if (!active) return
                if (Array.isArray(d.tracks)) setTracks(d.tracks)
                else setTracksError('Không tải được danh sách nhạc.')
            })
            .catch(() => active && setTracksError('Không tải được danh sách nhạc.'))
            .finally(() => active && setLoadingTracks(false))
        return () => {
            active = false
        }
    }, [])

    // Clean up any preview audio on unmount.
    useEffect(() => {
        return () => {
            audioRef.current?.pause()
            audioRef.current = null
        }
    }, [])

    const togglePreview = (trackUrl: string) => {
        if (previewUrl === trackUrl) {
            audioRef.current?.pause()
            audioRef.current = null
            setPreviewUrl(null)
            return
        }
        audioRef.current?.pause()
        const audio = new Audio(trackUrl)
        audio.volume = volume ? parseInt(volume, 10) / 100 : 0.3
        audio.play().catch(() => {})
        audio.onended = () => setPreviewUrl(null)
        audioRef.current = audio
        setPreviewUrl(trackUrl)
    }

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

            const res = await fetch('/api/manage/couple', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coupleId, fields: payload }),
            })
            if (!res.ok) {
                const d = await res.json().catch(() => ({}))
                throw new Error(d.error || 'save failed')
            }

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
                {/* Thư viện nhạc có sẵn */}
                <div>
                    <label className="block text-sm font-medium text-[#5b3a29] mb-2">
                        Chọn từ thư viện nhạc
                    </label>

                    {loadingTracks ? (
                        <p className="text-sm text-[#9a7d68]">Đang tải danh sách nhạc...</p>
                    ) : tracksError ? (
                        <p className="text-sm text-red-600">{tracksError}</p>
                    ) : tracks.length === 0 ? (
                        <p className="text-sm text-[#9a7d68]">Chưa có bài nhạc nào trong thư viện.</p>
                    ) : (
                        <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
                            {tracks.map((t) => {
                                const selected = url.trim() === t.url
                                const playing = previewUrl === t.url
                                return (
                                    <li
                                        key={t.url}
                                        className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                                            selected
                                                ? 'border-[#c08a4b] bg-[#fdf3e3]'
                                                : 'border-[#eedfcc] bg-[#fffaf3] hover:bg-[#fdf6ec]'
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => togglePreview(t.url)}
                                            aria-label={playing ? 'Dừng nghe thử' : 'Nghe thử'}
                                            className="shrink-0 w-9 h-9 rounded-full bg-[#f3e6d8] text-[#5b3a29] flex items-center justify-center hover:bg-[#e9d8c3] transition"
                                        >
                                            {playing ? (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                                            ) : (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                            )}
                                        </button>

                                        <span className="flex-1 min-w-0 truncate text-sm text-[#5b3a29]">
                                            {prettyName(t.name)}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setUrl(t.url)}
                                            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                                selected
                                                    ? 'bg-[#c08a4b] text-white'
                                                    : 'bg-[#f3e6d8] text-[#5b3a29] hover:bg-[#e9d8c3]'
                                            }`}
                                        >
                                            {selected ? '✓ Đang chọn' : 'Chọn'}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#5b3a29] mb-1">
                        Hoặc dán link nhạc (MP3)
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
