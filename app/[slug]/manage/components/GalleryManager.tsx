'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import ImageUploader from '@/components/ImageUploader'

type GalleryItem = {
  id: number
  image_url: string
  sort_order: number | null
}

type GalleryManagerProps = {
  coupleId: number
  slug: string
}

type UploadedImage = {
  url: string
  path: string
}

const formatOrder = (value: number | null) => (value ?? 0)

export default function GalleryManager({ coupleId, slug }: GalleryManagerProps) {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actingId, setActingId] = useState<number | null>(null)

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => (formatOrder(a.sort_order) - formatOrder(b.sort_order))),
    [items]
  )

  const loadGallery = async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('gallery')
      .select('*')
      .eq('couple_id', coupleId)
      .order('sort_order', { ascending: true })

    if (fetchError) {
      setError('Không thể tải gallery.')
    } else {
      setItems(data || [])
      setError(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadGallery()
  }, [])

  const handleUploadSuccess = async (results: { original: string }[]) => {
    try {
      const currentMax = Math.max(0, ...items.map((i) => formatOrder(i.sort_order)))
      const payload = results.map((item, idx) => ({
        couple_id: coupleId,
        image_url: item.original,
        sort_order: currentMax + idx + 1,
      }))
      const { error: insertError } = await supabase
        .from('gallery')
        .insert(payload)

      if (insertError) throw insertError
      await loadGallery()
    } catch (err) {
      console.error(err)
      setError('Tải ảnh thành công nhưng không lưu được vào Database.')
    }
  }

  const handleDelete = async (id: number) => {
    const ok = window.confirm('Xoá ảnh này khỏi album?')
    if (!ok) return
    setActingId(id)
    const { error: deleteError } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError('Không xoá được ảnh.')
    } else {
      setItems((prev) => prev.filter((i) => i.id !== id))
    }
    setActingId(null)
  }

  const swapOrder = async (sourceId: number, targetId: number) => {
    const source = items.find((i) => i.id === sourceId)
    const target = items.find((i) => i.id === targetId)
    if (!source || !target) return

    const sourceOrder = formatOrder(source.sort_order)
    const targetOrder = formatOrder(target.sort_order)

    await supabase
      .from('gallery')
      .update({ sort_order: targetOrder })
      .eq('id', sourceId)

    await supabase
      .from('gallery')
      .update({ sort_order: sourceOrder })
      .eq('id', targetId)
  }

  const handleMove = async (id: number, direction: 'up' | 'down') => {
    const list = sortedItems
    const index = list.findIndex((i) => i.id === id)
    if (index === -1) return

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= list.length) return

    setActingId(id)
    try {
      await swapOrder(list[index].id, list[targetIndex].id)
      await loadGallery()
    } finally {
      setActingId(null)
    }
  }

  return (
    <div className="space-y-4 bg-white rounded-3xl border border-amber-50 shadow-[0_20px_50px_rgba(92,65,35,0.08)] p-6">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Album</p>
        <h3 className="font-display text-2xl text-[#5b3a29]">Quản lý ảnh</h3>
        <p className="text-sm text-[#9a7d68]">Xem, tải lên và sắp xếp thứ tự ảnh.</p>
      </div>

      <div className="space-y-3">
        <ImageUploader weddingId={slug} onUploadSuccess={handleUploadSuccess} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && (
          <div className="col-span-full text-center text-[#7b5e4b] py-6">Đang tải gallery...</div>
        )}

        {!loading && sortedItems.length === 0 && (
          <div className="col-span-full text-center text-[#7b5e4b] py-6">Chưa có ảnh nào.</div>
        )}

        {!loading && sortedItems.map((item, idx) => (
          <div
            key={item.id}
            className="relative rounded-2xl overflow-hidden bg-white border border-[#eedfcc] shadow-[0_18px_38px_rgba(92,65,35,0.08)] group"
          >
            <div className="absolute top-2 left-2 bg-white/85 text-xs font-semibold text-[#5b3a29] px-2 py-1 rounded-full shadow-sm">
              #{idx + 1}
            </div>
            <img
              src={item.image_url}
              alt=""
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex items-center justify-between px-3 py-3 bg-gradient-to-t from-[#fff7ec] to-white/90 text-sm text-[#5b3a29]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMove(item.id, 'up')}
                  disabled={actingId === item.id || idx === 0}
                  className="rounded-full bg-[#f3e6d8] px-3 py-1 text-xs font-semibold hover:bg-[#e9d8c3] transition disabled:opacity-50"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(item.id, 'down')}
                  disabled={actingId === item.id || idx === sortedItems.length - 1}
                  className="rounded-full bg-[#f3e6d8] px-3 py-1 text-xs font-semibold hover:bg-[#e9d8c3] transition disabled:opacity-50"
                >
                  ↓
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={actingId === item.id}
                className="rounded-full bg-[#fbe9e3] px-3 py-1 text-xs font-semibold text-[#b44b3d] hover:bg-[#f6d8cf] transition disabled:opacity-60"
              >
                {actingId === item.id ? 'Đang xoá...' : 'Xoá'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
