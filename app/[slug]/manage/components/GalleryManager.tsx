'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

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
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
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

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [files])

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const selected = Array.from(event.target.files)
    setFiles(selected)
  }

  const uploadImages = async (fileList: File[]) => {
    if (!fileList.length) return [] as UploadedImage[]
    const uploads: UploadedImage[] = []

    for (const file of fileList) {
      const safeName = file.name.replace(/\s+/g, '-').toLowerCase()
      const uniqueId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`
      const filePath = `${slug}/${uniqueId}-${safeName}`

      const { error: uploadError } = await supabase
        .storage
        .from('wedding-images')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600',
          contentType: file.type,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase
        .storage
        .from('wedding-images')
        .getPublicUrl(filePath)

      uploads.push({ url: data.publicUrl, path: filePath })
    }

    return uploads
  }

  const handleUpload = async () => {
    if (!files.length) return
    setError(null)
    setUploading(true)

    try {
      const uploaded = await uploadImages(files)
      if (uploaded.length) {
        const currentMax = Math.max(0, ...items.map((i) => formatOrder(i.sort_order)))
        const payload = uploaded.map((item, idx) => ({
          couple_id: coupleId,
          image_url: item.url,
          sort_order: currentMax + idx + 1,
        }))
        const { error: insertError } = await supabase
          .from('gallery')
          .insert(payload)
        if (insertError) {
          throw insertError
        }
        setFiles([])
        setPreviews([])
        await loadGallery()
      }
    } catch (err) {
      setError('Tải ảnh thất bại. Vui lòng thử lại.')
    } finally {
      setUploading(false)
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
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e)}
          className="w-full rounded-xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
        />
        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previews.map((src, idx) => (
              <div key={src} className="relative rounded-2xl overflow-hidden bg-[#f8f1e6] shadow-sm">
                <div className="absolute top-2 left-2 bg-white/80 text-xs font-semibold text-[#5b3a29] px-2 py-1 rounded-full">
                  {idx + 1}
                </div>
                <img src={src} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !files.length}
          className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#f0b45b] via-[#ee9c47] to-[#e6873f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200/70 transition hover:brightness-105 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {uploading ? 'Đang tải ảnh...' : 'Tải ảnh lên'}
        </button>
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
