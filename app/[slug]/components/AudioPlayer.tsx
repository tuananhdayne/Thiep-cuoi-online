'use client'

import { useEffect, useRef, useState } from 'react'

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
    const [userManuallyPaused, setUserManuallyPaused] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const normalizedVolume = Math.max(0, Math.min(volume ?? 0.3, 1))

    const attemptPlay = async () => {
        const audio = audioRef.current
        if (!audio || !musicUrl) return false

        audio.volume = normalizedVolume
        audio.load()

        try {
            await audio.play()
            setIsPlaying(true)
            setShowPlayText(false)
            setUserManuallyPaused(false)
            return true
        } catch {
            setIsPlaying(false)
            setShowPlayText(true)
            return false
        }
    }

    // Handle initial autoplay attempt
    useEffect(() => {
        if (!musicUrl) return

        const timer = setTimeout(() => {
            if (autoplay && !userManuallyPaused) {
                void attemptPlay()
            }
        }, (delay !== null && delay !== undefined ? delay : 15) * 1000)

        return () => clearTimeout(timer)
    }, [musicUrl, delay, autoplay, userManuallyPaused])

    // Handle user interaction fallback for blocked autoplay (first gesture anywhere)
    useEffect(() => {
        if (!musicUrl || isPlaying || userManuallyPaused || !autoplay) return

        const handleInteraction = () => {
            if (!isPlaying && !userManuallyPaused) {
                void attemptPlay().then((started) => {
                    if (started) removeListeners()
                })
            }
        }

        const addListeners = () => {
            document.addEventListener('pointerdown', handleInteraction, { passive: true })
            document.addEventListener('touchstart', handleInteraction, { passive: true })
            document.addEventListener('touchmove', handleInteraction, { passive: true })
            document.addEventListener('wheel', handleInteraction, { passive: true })
            document.addEventListener('scroll', handleInteraction, { passive: true })
            document.addEventListener('keydown', handleInteraction)
        }

        const removeListeners = () => {
            document.removeEventListener('pointerdown', handleInteraction)
            document.removeEventListener('touchstart', handleInteraction)
            document.removeEventListener('touchmove', handleInteraction)
            document.removeEventListener('wheel', handleInteraction)
            document.removeEventListener('scroll', handleInteraction)
            document.removeEventListener('keydown', handleInteraction)
        }

        addListeners()

        return () => removeListeners()
    }, [musicUrl, isPlaying, userManuallyPaused, autoplay, normalizedVolume])

    if (!musicUrl) return null

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
            setUserManuallyPaused(true)
        } else {
            void attemptPlay().catch((err) => {
                console.error('Lỗi phát nhạc:', err)
            })
        }
    }

    return (
        <>
            <audio ref={audioRef} src={musicUrl} loop className="sr-only" playsInline preload="auto" aria-hidden="true" />

            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
                {showPlayText && !isPlaying && (
                    <span className="bg-white/95 backdrop-blur-sm text-[#c08a4b] text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg animate-bounce whitespace-nowrap font-medium border border-[#c08a4b]/30">
                        Bật nhạc 🎵
                    </span>
                )}
                <div className="relative">
                    {/* Floating music note sparkles when playing */}
                    {isPlaying && (
                        <div aria-hidden="true" className="pointer-events-none absolute -top-8 inset-x-0 flex justify-center">
                            <span className="text-amber-500 text-sm font-bold animate-ping opacity-75">♪</span>
                        </div>
                    )}
                    {/* Outer glowing pulsing ring when playing */}
                    {isPlaying && (
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-70 blur-sm animate-pulse pointer-events-none" />
                    )}
                    <button
                        onClick={togglePlay}
                        className={`relative w-12 h-12 bg-gradient-to-br from-[#d4af37] via-[#c08a4b] to-[#996515] text-white rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(192,138,75,0.45)] border-2 border-white/60 transition-transform hover:scale-110 active:scale-95 ${
                            isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
                        }`}
                        aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc cưới'}
                    >
                        {isPlaying ? (
                            <div className="flex items-center gap-0.5 pointer-events-none">
                                <span className="w-1 h-3.5 bg-white rounded-full animate-pulse" />
                                <span className="w-1 h-5 bg-white rounded-full animate-pulse delay-75" />
                                <span className="w-1 h-3 bg-white rounded-full animate-pulse delay-150" />
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}
