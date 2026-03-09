'use client'

import { useEffect, useState } from 'react'
import WishForm from './WishForm'
import Reveal from './Reveal'
import { supabase } from '@/lib/supabaseClient'

export type Wish = {
  id: number
  name: string | null
  message: string
  created_at: string
}

type WishSectionProps = {
  coupleId: number
  initialWishes: Wish[]
  guestName?: string
}

const formatDate = (value: string) => {
  const dateStr = value.endsWith('Z') || value.includes('+') ? value : `${value}Z`
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(dateStr))
}

export default function WishSection({ coupleId, initialWishes, guestName }: WishSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes || [])

  useEffect(() => {
    const handler = async () => {
      const { data } = await supabase
        .from('wishes')
        .select('*')
        .eq('couple_id', coupleId)
        .order('created_at', { ascending: false })
      setWishes(data || [])
    }
    window.addEventListener('wishes-refresh', handler)
    return () => window.removeEventListener('wishes-refresh', handler)
  }, [coupleId])

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-bg-main to-accent-bg" id="wishes">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        <Reveal className="paper-card p-8 space-y-6 bg-white/95 border border-border-light shadow-[0_26px_60px_rgba(91,58,41,0.08)]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Lời chúc</p>
            <h3 className="font-display text-3xl text-primary">Những lời yêu thương</h3>
            <p className="text-sm text-primary-light">
              {guestName ? `Lời chúc từ ${guestName} và bạn bè.` : 'Cảm ơn bạn đã gửi những lời chúc tốt đẹp dành cho chúng tôi.'}
            </p>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {wishes.length === 0 && (
              <p className="text-sm text-primary-light">
                Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
              </p>
            )}

            {wishes.length > 0 && (
              <div className="space-y-3">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="rounded-[20px] bg-white/70 backdrop-blur-sm px-6 py-5 shadow-[0_4px_20px_rgba(91,58,41,0.04)] border border-white/60 hover:shadow-[0_8px_30px_rgba(91,58,41,0.08)] transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between text-primary mb-2">
                      <span className="font-bold text-base">{wish.name || 'Ẩn danh'}</span>
                      <span className="text-[11px] font-medium text-primary-light opacity-80 uppercase tracking-wider">{formatDate(wish.created_at)}</span>
                    </div>
                    <p className="text-[15px] text-primary-light leading-relaxed">
                      {wish.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="paper-card p-8 space-y-4 bg-white/95 border border-border-light shadow-[0_26px_60px_rgba(91,58,41,0.08)]">
          <WishForm coupleId={coupleId} guestName={guestName} onSubmitted={() => { window.dispatchEvent(new CustomEvent('wishes-refresh')); }} />
        </Reveal>
      </div>
    </section>
  )
}
