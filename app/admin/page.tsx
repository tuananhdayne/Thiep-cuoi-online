'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type Couple = {
  id: number
  slug: string
  bride_name: string
  groom_name: string
  wedding_date: string | null
  location: string | null
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [couples, setCouples] = useState<Couple[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchCouples = async () => {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('couples')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError('Không thể tải danh sách thiệp.')
      } else {
        setCouples(data || [])
      }
      setLoading(false)
    }

    fetchCouples()
  }, [])

  const formatDate = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat('vi-VN', {
          dateStyle: 'medium',
        }).format(new Date(value))
      : '—'

  const formatDateTime = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat('vi-VN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(value))
      : '—'

  const handleCopy = async (slug: string) => {
    const url = `${window.location.origin}/${slug}`
    await navigator.clipboard.writeText(url)
    alert('Đã copy link: ' + url)
  }

  const handleView = (slug: string) => {
    router.push(`/${slug}`)
  }

  const handleDelete = async (id: number, slug: string) => {
    const ok = window.confirm(`Xoá thiệp "${slug}"? Hành động không thể hoàn tác.`)
    if (!ok) return

    setDeletingId(id)
    const { error: deleteError } = await supabase
      .from('couples')
      .delete()
      .eq('id', id)

    if (deleteError) {
      alert('Xoá thất bại. Vui lòng thử lại.')
    } else {
      setCouples((prev) => prev.filter((c) => c.id !== id))
    }
    setDeletingId(null)
  }

  const empty = useMemo(() => !loading && couples.length === 0, [loading, couples])

  return (
    <main
      className="min-h-screen px-4 py-12 bg-[#f8f4ef]"
      style={{
        background: `radial-gradient(circle at 50% 35%, rgba(240, 221, 200, 0.18), transparent 45%), #f8f4ef`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl shadow-amber-100/50 border border-amber-50 p-6 md:p-8 space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[#8c6f5a]">Admin</p>
              <h1 className="font-display text-[28px] text-[#5b3a29] leading-tight">Quản lý thiệp cưới</h1>
              <p className="text-sm text-[#9a7d68]">Danh sách tất cả các thiệp đã tạo.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#eedfcc] bg-[#fffaf3]/60">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-[#5b3a29]">
                <thead className="bg-[#f6ecdf] text-xs uppercase tracking-wide text-[#7b5e4b]">
                  <tr>
                    <th className="px-4 py-3">Cặp đôi</th>
                    <th className="px-4 py-3">Ngày cưới</th>
                    <th className="px-4 py-3">Địa điểm</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Tạo lúc</th>
                    <th className="px-4 py-3 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-[#7b5e4b]">
                        Đang tải...
                      </td>
                    </tr>
                  )}

                  {empty && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[#7b5e4b]">
                        Chưa có thiệp nào.
                      </td>
                    </tr>
                  )}

                  {!loading && couples.map((c) => (
                    <tr key={c.id} className="border-t border-[#f0e3d4] bg-white hover:bg-[#fff7ec] transition">
                      <td className="px-4 py-3 font-semibold">{c.bride_name} &amp; {c.groom_name}</td>
                      <td className="px-4 py-3">{formatDate(c.wedding_date)}</td>
                      <td className="px-4 py-3 text-[#7b5e4b]">{c.location || '—'}</td>
                      <td className="px-4 py-3 text-[#b9772b] font-medium">/{c.slug}</td>
                      <td className="px-4 py-3 text-[#7b5e4b]">{formatDateTime(c.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(c.slug)}
                            className="rounded-full bg-[#f3e6d8] px-3 py-2 text-xs font-semibold text-[#5b3a29] hover:bg-[#e9d8c3] transition"
                          >
                            Xem thiệp
                          </button>
                          <button
                            onClick={() => handleCopy(c.slug)}
                            className="rounded-full bg-[#f9eddc] px-3 py-2 text-xs font-semibold text-[#b9772b] hover:bg-[#f3e0c5] transition"
                          >
                            Copy link
                          </button>
                          <button
                            onClick={() => handleDelete(c.id, c.slug)}
                            disabled={deletingId === c.id}
                            className="rounded-full bg-[#fbe9e3] px-3 py-2 text-xs font-semibold text-[#b44b3d] hover:bg-[#f6d8cf] transition disabled:opacity-60"
                          >
                            {deletingId === c.id ? 'Đang xoá...' : 'Xoá'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </main>
  )
}
