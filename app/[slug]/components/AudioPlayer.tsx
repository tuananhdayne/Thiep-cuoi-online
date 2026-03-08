'use client'

import { useState, useEffect, useRef } from 'react'

interface AudioPlayerProps {
    musicUrl?: string | null
    delay?: number | null
    volume?: number | null
    autoplay?: boolean | null
}

export default function AudioPlayer({
    musicUrl,
    delay = 15,
    volume = 0.3,
    autoplay = true,
}: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [showPlayText, setShowPlayText] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (!musicUrl) return

        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.volume = volume ?? 0.3

                if (autoplay) {
                    const playPromise = audioRef.current.play()
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                setIsPlaying(true)
                                setShowPlayText(false)
                            })
                            .catch(() => {
                                // Autoplay was prevented by browser
                                setIsPlaying(false)
                                setShowPlayText(true)
                            })
                    }
                }
            }
        }, (delay !== null && delay !== undefined ? delay : 15) * 1000)

        return () => clearTimeout(timer)
    }, [musicUrl, delay, volume, autoplay])

    if (!musicUrl) return null

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                const playPromise = audioRef.current.play()
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true)
                        setShowPlayText(false)
                    }).catch(err => {
                        console.error("Lỗi phát nhạc:", err)
                    })
                }
            }
        }
    }

    return (
        <>
            <audio ref={audioRef} src={musicUrl} loop className="hidden" />

            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
                {showPlayText && !isPlaying && (
                    <span className="bg-white text-[#c08a4b] text-sm px-3 py-1.5 rounded-full shadow-md animate-pulse whitespace-nowrap font-medium border border-[#c08a4b]/20">
                        Bật nhạc
                    </span>
                )}
                <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-[#c08a4b] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    )
}
