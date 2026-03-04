'use client'

import { FormEvent, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type WishFormProps = {
  coupleId: number
  onSubmitted?: () => Promise<void> | void
}

export default function WishForm({ coupleId, onSubmitted }: WishFormProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!message.trim()) {
      setError('Vui lòng viết lời chúc trước khi gửi.')
      return
    }

    setLoading(true)

    const { error: insertError } = await supabase.from('wishes').insert({
      couple_id: coupleId,
      name: name.trim() || 'Ẩn danh',
      message: message.trim(),
    })

    if (insertError) {
      setError('Gửi lời chúc thất bại, vui lòng thử lại.')
      setLoading(false)
      return
    }

    setName('')
    setMessage('')
    setLoading(false)

    if (onSubmitted) {
      await onSubmitted()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-amber-100 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
        />
        <input
          type="text"
          placeholder="Nhập khung giờ tham gia"
          className="w-full rounded-2xl border border-amber-100 bg-white/60 px-4 py-3 text-sm text-amber-900/70 focus:outline-none focus:ring-2 focus:ring-amber-200 shadow-sm"
          disabled
          value="Sẵn sàng đón tiếp"
        />
      </div>
      <textarea
        placeholder="Gửi lời chúc đến cô dâu chú rể..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="w-full rounded-2xl border border-amber-100 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200 transition hover:bg-amber-800 disabled:opacity-60"
      >
        {loading ? 'Đang gửi...' : 'Gửi lời chúc'}
      </button>
    </form>
  )
}
