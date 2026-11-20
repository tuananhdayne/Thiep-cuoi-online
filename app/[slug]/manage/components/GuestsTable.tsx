'use client'

import { useEffect, useMemo, useState } from 'react'

type Guest = {
  id: string | number
  couple_id: string | number
  guest_name: string
  guest_slug: string
  created_at: string
}

type GuestsTableProps = {
  coupleId: string | number
  baseSlug: string
  initialGuests: Guest[]
}

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(value))

export default function GuestsTable({ coupleId, baseSlug, initialGuests }: GuestsTableProps) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests || [])
  const [loading, setLoading] = useState(false)
  const [copying, setCopying] = useState<string | number | null>(null)
  const [deleting, setDeleting] = useState<string | number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const total = useMemo(() => guests.length, [guests])

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/manage/guests?coupleId=${encodeURIComponent(String(coupleId))}`, {
        cache: 'no-store',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Không tải được danh sách khách.')
      } else {
        setGuests(data.guests || [])
        setError(null)
      }
    } catch {
      setError('Không tải được danh sách khách.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setGuests(initialGuests || [])
  }, [initialGuests])

  useEffect(() => {
    const handler = () => refresh()
    if (typeof window !== 'undefined') {
      window.addEventListener('guests-refresh', handler)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('guests-refresh', handler)
      }
    }
  }, [])

  const handleCopy = async (guest: Guest) => {
    const path = `/${baseSlug}/${guest.guest_slug}`
    const url = `${window.location.origin}${path}`
    try {
      setCopying(guest.id)
      await navigator.clipboard.writeText(url)
    } finally {
      setCopying(null)
    }
  }

  const handleDelete = async (guest: Guest) => {
    const ok = window.confirm(`Xoá khách "${guest.guest_name}"?`)
    if (!ok) return
    setDeleting(guest.id)
    try {
      const res = await fetch(
        `/api/manage/guests/${guest.id}?coupleId=${encodeURIComponent(String(coupleId))}`,
        { method: 'DELETE' }
      )
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Không xoá được khách này.')
      } else {
        setGuests((prev) => prev.filter((g) => g.id !== guest.id))
      }
    } catch {
      setError('Không xoá được khách này.')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="h-full rounded-3xl bg-white/95 border border-amber-50 shadow-[0_26px_60px_rgba(92,65,35,0.08)] p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Danh sách</p>
          <h3 className="font-display text-xl text-[#5b3a29]">Khách mời đã lưu</h3>
          <p className="text-sm text-[#9a7d68]">Tổng cộng {total} khách</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="rounded-full bg-[#fff0d8] px-3 py-2 text-xs font-semibold text-[#b9772b] hover:bg-[#f7e2bf] transition"
        >
          {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
        {guests.length === 0 && !loading && (
          <div className="text-sm text-[#7b5e4b]">Chưa có khách mời nào.</div>
        )}

        {guests.map((guest) => {
          const linkPath = `/${baseSlug}/${guest.guest_slug}`
          return (
            <div
              key={guest.id}
              className="rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3 shadow-sm space-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="font-semibold text-[#5b3a29]">{guest.guest_name}</p>
                  <p className="text-xs text-[#7b5e4b]">{formatDateTime(guest.created_at)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(guest)}
                  disabled={deleting === guest.id}
                  className="text-xs font-semibold text-[#b44b3d] rounded-full bg-[#fbe9e3] px-3 py-1 hover:bg-[#f6d8cf] transition disabled:opacity-60"
                >
                  {deleting === guest.id ? 'Đang xoá...' : 'Xoá'}
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm text-[#5b3a29]">
                <span className="truncate">{linkPath}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(guest)}
                  className="text-xs font-semibold text-[#b9772b] rounded-full bg-[#fff0d8] px-3 py-1 hover:bg-[#f7e2bf] transition"
                >
                  {copying === guest.id ? 'Đang copy...' : 'Copy link'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
