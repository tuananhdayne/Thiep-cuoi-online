'use client'

import { useState } from 'react'
import Reveal from './Reveal'
import { supabase } from '@/lib/supabaseClient'

export type RsvpSectionProps = {
    coupleId: number
    guestName?: string
    brideAvatar?: string | null
    groomAvatar?: string | null
}

export default function RsvpSection({ coupleId, guestName: initialGuestName = '', brideAvatar, groomAvatar }: RsvpSectionProps) {
    const [guestName, setGuestName] = useState(initialGuestName)
    const [attendStatus, setAttendStatus] = useState<'Có' | 'Không' | 'Chưa chắc'>('Có')
    const [guestCount, setGuestCount] = useState<'1' | '2' | '3' | '4'>('1')
    const [side, setSide] = useState<'Nhà trai' | 'Nhà gái'>('Nhà gái')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!guestName.trim()) {
            setToastMessage('Vui lòng nhập tên của bạn')
            setTimeout(() => setToastMessage(''), 3000)
            return
        }

        setIsSubmitting(true)
        try {
            const { error } = await supabase.from('rsvp').insert([
                {
                    couple_id: coupleId,
                    guest_name: guestName.trim(),
                    attend_status: attendStatus,
                    guest_count: parseInt(guestCount, 10),
                    side: side,
                },
            ])

            if (error) throw error

            setToastMessage('Cảm ơn bạn đã xác nhận!')
        } catch (err) {
            console.error(err)
            setToastMessage('Có lỗi xảy ra, vui lòng thử lại sau.')
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setToastMessage(''), 4000)
        }
    }

    return (
        <section className="py-16 px-6 relative" id="rsvp">
            <div className="max-w-3xl mx-auto">
                <Reveal className="space-y-8">
                    <div className="text-center space-y-2">
                        <p className="text-xs uppercase tracking-[0.32em] text-accent">Xác nhận</p>
                        <h2 className="font-display text-3xl md:text-4xl text-primary">Tham dự lễ cưới</h2>
                        <p className="text-sm text-primary-light max-w-md mx-auto">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi</p>
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-[32px] shadow-[0_30px_60px_rgba(91,58,41,0.08)] border border-border-light p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Guest Name */}
                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">Họ và tên của bạn</label>
                                <input
                                    type="text"
                                    placeholder="Nhập họ và tên..."
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    required
                                    className="w-full px-5 py-3.5 rounded-2xl bg-bg-alt/50 border-border-light text-primary placeholder:text-primary-light focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Attendance */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">Bạn sẽ đến chứ?</label>
                                    <select
                                        value={attendStatus}
                                        onChange={(e) => setAttendStatus(e.target.value as any)}
                                        className="w-full px-5 py-3.5 rounded-2xl bg-bg-alt/50 border-border-light text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none outline-none"
                                    >
                                        <option value="Có">Có, tôi sẽ đến</option>
                                        <option value="Chưa chắc">Tôi chưa chắc chắn</option>
                                        <option value="Không">Rất tiếc, tôi không thể đến</option>
                                    </select>
                                </div>

                                {/* Guest Count */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">Bạn đi bao nhiêu người?</label>
                                    <select
                                        value={guestCount}
                                        onChange={(e) => setGuestCount(e.target.value as any)}
                                        className="w-full px-5 py-3.5 rounded-2xl bg-bg-alt/50 border-border-light text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none outline-none"
                                        disabled={attendStatus === 'Không'}
                                    >
                                        <option value="1">1 người</option>
                                        <option value="2">2 người</option>
                                        <option value="3">3 người</option>
                                        <option value="4">4 người trở lên</option>
                                    </select>
                                </div>
                            </div>

                            {/* Which Side */}
                            <div>
                                <label className="block text-sm font-medium text-primary mb-3 text-center">Bạn là khách mời của ai?</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label
                                        className={`cursor-pointer rounded-[24px] border-2 overflow-hidden text-center transition-all relative group ${side === 'Nhà trai' ? 'border-accent shadow-[0_8px_20px_rgba(192,138,75,0.2)]' : 'border-border-light hover:border-accent/40'
                                            }`}
                                    >
                                        <input type="radio" name="side" value="Nhà trai" checked={side === 'Nhà trai'} onChange={() => setSide('Nhà trai')} className="sr-only" />
                                        <div className="aspect-square bg-accent-pale relative">
                                            {groomAvatar ? (
                                                <img src={groomAvatar} alt="Chú rể" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-5xl">🤵‍♂️</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-0 right-0 text-white font-medium drop-shadow-md text-lg">Nhà trai</div>
                                        </div>
                                    </label>
                                    <label
                                        className={`cursor-pointer rounded-[24px] border-2 overflow-hidden text-center transition-all relative group ${side === 'Nhà gái' ? 'border-accent shadow-[0_8px_20px_rgba(192,138,75,0.2)]' : 'border-border-light hover:border-accent/40'
                                            }`}
                                    >
                                        <input type="radio" name="side" value="Nhà gái" checked={side === 'Nhà gái'} onChange={() => setSide('Nhà gái')} className="sr-only" />
                                        <div className="aspect-square bg-accent-pale relative">
                                            {brideAvatar ? (
                                                <img src={brideAvatar} alt="Cô dâu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-5xl">👰‍♀️</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-0 right-0 text-white font-medium drop-shadow-md text-lg">Nhà gái</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-2xl text-white font-medium bg-gradient-to-r from-accent to-accent-light shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                                >
                                    {isSubmitting ? 'Đang gửi...' : 'Xác nhận tham dự'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Reveal>

                {/* Toast Notification */}
                {
                    toastMessage && (
                        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
                            <div className="bg-primary text-bg-main px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                                <span className="text-xl">{toastMessage.includes('lỗi') ? '⚠️' : '✅'}</span>
                                <p className="text-sm font-medium">{toastMessage}</p>
                            </div>
                        </div>
                    )
                }
            </div >
        </section >
    )
}
