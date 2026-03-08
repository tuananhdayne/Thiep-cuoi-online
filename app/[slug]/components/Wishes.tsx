'use client'

import { useMemo, useState } from 'react'
import WishForm from './WishForm'
import { supabase } from '@/lib/supabaseClient'

type Wish = {
  id: number
  name: string | null
  message: string
  created_at: string
}

type WishesProps = {
  coupleId: number
  initialWishes: Wish[]
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(value))

export default function Wishes({ coupleId, initialWishes }: WishesProps) {
  const [wishes, setWishes] = useState(initialWishes || [])
  const [loading, setLoading] = useState(false)

  const hasWishes = useMemo(() => wishes.length > 0, [wishes])

  const refreshWishes = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('wishes')
      .select('*')
      .eq('couple_id', coupleId)
      .order('created_at', { ascending: false })

    setWishes(data || [])
    setLoading(false)
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-[#fdf8f3] to-[#f6ecdf]">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <div className="paper-card p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-800/70">Lời chúc</p>
            <h3 className="font-display text-3xl text-amber-900">Những lời yêu thương</h3>
            <p className="text-sm text-amber-800/80">
              Cảm ơn bạn đã gửi những lời chúc tốt đẹp dành cho chúng tôi.
            </p>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {loading && <p className="text-sm text-amber-700">Đang tải lời chúc...</p>}

            {!loading && !hasWishes && (
              <p className="text-sm text-amber-700/80">
                Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
              </p>
            )}

            {!loading && hasWishes && (
              <div className="space-y-3">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="rounded-2xl border border-amber-100 bg-white/90 px-5 py-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-amber-900">
                      <span>{wish.name || 'Ẩn danh'}</span>
                      <span className="text-xs text-amber-700/70">{formatDate(wish.created_at)}</span>
                    </div>
                    <p className="mt-2 text-sm text-amber-900/90 leading-relaxed">
                      {wish.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="paper-card p-8 space-y-4">
          <div className="space-y-2">
            <h4 className="font-display text-2xl text-amber-900">Gửi lời chúc</h4>
            <p className="text-sm text-amber-800/80">
              Chia sẻ niềm vui cùng chúng tôi.
            </p>
          </div>

          <WishForm coupleId={coupleId} onSubmitted={refreshWishes} />
        </div>
      </div>
    </section>
  )
}
