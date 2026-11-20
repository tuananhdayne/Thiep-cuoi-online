'use client'

import { useMemo, useState } from 'react'

type InviteInputProps = {
  coupleId: string | number
  baseSlug: string
  onSaved?: () => void
}

export default function InviteInput({ coupleId, baseSlug, onSaved }: InviteInputProps) {
  const [names, setNames] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parsedGuests = useMemo(
    () =>
      names
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    [names]
  )

  const handleSave = async () => {
    if (!parsedGuests.length) {
      setError('Vui lòng nhập ít nhất một khách mời.')
      return
    }
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await fetch('/api/manage/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupleId, names: Array.from(new Set(parsedGuests)) }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error || 'Không thể lưu danh sách khách. Vui lòng thử lại.')
        return
      }

      setMessage('Đã lưu danh sách khách mời.')
      setNames('')
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('guests-refresh'))
      }
      onSaved?.()
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full rounded-3xl bg-white/95 border border-amber-50 shadow-[0_26px_60px_rgba(92,65,35,0.08)] p-6 space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Khách mời</p>
        <h3 className="font-display text-2xl text-[#5b3a29]">Nhập danh sách &amp; tạo link</h3>
        <p className="text-sm text-[#9a7d68]">Mỗi dòng một tên, hệ thống sẽ tạo slug và link mời.</p>
      </div>

      <textarea
        value={names}
        onChange={(e) => setNames(e.target.value)}
        rows={8}
        placeholder={'Ví dụ:\nNgọc Anh\nBảo Minh\nCô chú Hưng'}
        className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
      />

      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#f0b45b] via-[#ee9c47] to-[#e6873f] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200/70 transition hover:brightness-105 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? 'Đang lưu...' : 'Lưu danh sách & tạo link'}
      </button>

      {message && <p className="text-sm text-emerald-700">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {parsedGuests.length > 0 && (
        <div className="rounded-2xl border border-[#eedfcc] bg-[#fffaf3] p-4 text-sm text-[#5b3a29] space-y-1">
          <p className="font-semibold text-[#7b5e4b]">Sẽ tạo {parsedGuests.length} khách:</p>
          <ul className="list-disc list-inside space-y-1">
            {parsedGuests.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-br from-[#fff2d8] via-[#fde7d0] to-[#f9ddec] border border-[#f6dec3] p-4 text-sm text-[#7b5e4b]">
        <p className="font-semibold text-[#5b3a29]">Mẫu link</p>
        <p className="mt-1">/{baseSlug}/ten-khach</p>
        <p className="text-xs mt-1 text-[#9a7d68]">Slug khách mời sẽ tự động bỏ dấu và thay dấu cách bằng “-”.</p>
      </div>
    </div>
  )}
