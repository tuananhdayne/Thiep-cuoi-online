'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import ImageUploader from '@/components/ImageUploader'

type CouplePayload = {
  bride_name: string
  groom_name: string
  intro_description: string
  wedding_date: string
  wedding_time: string
  location: string
  address: string
  slug: string
  bride_event_title: string
  bride_event_date: string
  bride_event_time: string
  bride_location: string
  bride_address: string
  bride_google_map_embed: string
  groom_event_title: string
  groom_event_date: string
  groom_event_time: string
  groom_location: string
  groom_address: string
  groom_google_map_embed: string
}

type UploadedImage = {
  url: string
  path: string
}

const slugify = (bride: string, groom: string) => {
  const raw = `${bride} ${groom}`.trim() || 'wedding'
  return raw
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-') || 'wedding'
}

const extractMapSrc = (value: string) => {
  if (!value) return ''
  const iframeMatch = value.match(/<iframe[^>]*src=["']([^"']+)["']/i)
  if (iframeMatch?.[1]) return iframeMatch[1].trim()
  const trimmed = value.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return ''
}

const requiredFields: (keyof CouplePayload)[] = [
  'bride_name',
  'groom_name',
  'intro_description',
  'wedding_date',
  'wedding_time',
  'location',
  'address',
  'bride_event_title',
  'bride_event_date',
  'bride_event_time',
  'bride_location',
  'bride_address',
  'groom_event_title',
  'groom_event_date',
  'groom_event_time',
  'groom_location',
  'groom_address',
]

export default function CreatePage() {
  const router = useRouter()
  const [form, setForm] = useState<CouplePayload>({
    bride_name: '',
    groom_name: '',
    intro_description: '',
    wedding_date: '',
    wedding_time: '',
    location: '',
    address: '',
    slug: '',
    bride_event_title: 'Lễ Vu Quy',
    bride_event_date: '',
    bride_event_time: '',
    bride_location: '',
    bride_address: '',
    bride_google_map_embed: '',
    groom_event_title: 'Lễ Thành Hôn',
    groom_event_date: '',
    groom_event_time: '',
    groom_location: '',
    groom_address: '',
    groom_google_map_embed: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<{ original: string }[]>([])

  const slug = useMemo(
    () => slugify(form.bride_name, form.groom_name),
    [form.bride_name, form.groom_name]
  )

  const brideMap = useMemo(
    () => extractMapSrc(form.bride_google_map_embed),
    [form.bride_google_map_embed]
  )
  const groomMap = useMemo(
    () => extractMapSrc(form.groom_google_map_embed),
    [form.groom_google_map_embed]
  )

  const handleChange = (key: keyof CouplePayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleUploadSuccess = (results: { original: string }[]) => {
    // Append the new uploads
    setUploadedImages((prev) => [...prev, ...results])
  }

  const validate = () => {
    const missing = requiredFields.filter((field) => !form[field]?.trim())
    if (missing.length > 0) {
      return 'Vui lòng điền đầy đủ thông tin bắt buộc.'
    }
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    const payload: CouplePayload = {
      ...form,
      slug,
      bride_google_map_embed: brideMap,
      groom_google_map_embed: groomMap,
    }

    const { data: coupleRow, error: insertError } = await supabase
      .from('couples')
      .insert(payload)
      .select('id')
      .single()

    if (insertError) {
      setError('Không thể tạo thiệp. Vui lòng thử lại.')
      setLoading(false)
      return
    }

    if (!coupleRow?.id) {
      setError('Không lấy được thông tin thiệp vừa tạo.')
      setLoading(false)
      return
    }

    try {
      if (uploadedImages.length) {
        const galleryPayload = uploadedImages.map((item, index) => ({
          couple_id: coupleRow.id,
          image_url: item.original,
          sort_order: index + 1,
        }))

        const { error: galleryError } = await supabase
          .from('gallery')
          .insert(galleryPayload)

        if (galleryError) {
          setError('Tạo thiệp thành công nhưng lỗi lưu album ảnh. Bạn có thể vào phần Quản lý để thử lại.')
          setLoading(false)
          return
        }
      }
    } catch (err) {
      console.error(err)
      setError('Lỗi lưu album ảnh.')
      setLoading(false)
      return
    }

    router.push(`/${slug}`)
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-14"
      style={{
        background:
          'radial-gradient(circle at 20% 20%, rgba(255, 214, 170, 0.24), transparent 35%), radial-gradient(circle at 80% 10%, rgba(235, 183, 174, 0.2), transparent 36%), #f7f1e8',
      }}
    >
      <div className="w-full max-w-5xl">
        <div className="bg-white/90 backdrop-blur rounded-[28px] shadow-2xl shadow-amber-100/60 border border-amber-50/80 p-6 md:p-10 space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6f5a]">Tạo thiệp cưới</p>
            <h1 className="font-display text-3xl md:text-[34px] text-[#5b3a29] leading-tight">
              Nhập thông tin cặp đôi
            </h1>
            <p className="text-sm md:text-base text-[#9a7d68] leading-relaxed">
              Điền chi tiết buổi lễ của hai bên, kèm địa chỉ Google Map để khách dễ tìm đến.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3">
                <label className="text-sm text-[#7b5e4b]">Tên cô dâu *</label>
                <input
                  value={form.bride_name}
                  onChange={(e) => handleChange('bride_name', e.target.value)}
                  placeholder="Tên cô dâu"
                  className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm text-[#7b5e4b]">Tên chú rể *</label>
                <input
                  value={form.groom_name}
                  onChange={(e) => handleChange('groom_name', e.target.value)}
                  placeholder="Tên chú rể"
                  className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-sm text-[#7b5e4b]">Lời mời / giới thiệu *</label>
                <textarea
                  value={form.intro_description}
                  onChange={(e) => handleChange('intro_description', e.target.value)}
                  placeholder="Lời giới thiệu ngắn gọn, lời mời..."
                  rows={3}
                  className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm text-[#7b5e4b]">Ngày cưới *</label>
                <input
                  type="date"
                  value={form.wedding_date}
                  onChange={(e) => handleChange('wedding_date', e.target.value)}
                  className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#7b5e4b]">Giờ cưới *</label>
                <input
                  type="time"
                  value={form.wedding_time}
                  onChange={(e) => handleChange('wedding_time', e.target.value)}
                  className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#7b5e4b]">Địa điểm chung *</label>
                <input
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Tên sảnh / nhà hàng"
                  className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#7b5e4b]">Địa chỉ chung *</label>
                <input
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Số nhà, đường, quận"
                  className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="rounded-[22px] bg-[#fff7ed] border border-[#f6e2c6] p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.22em] text-[#c58645]">Bride side</p>
                    <h3 className="text-xl font-semibold text-[#5b3a29]">Thông tin nhà gái</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    value={form.bride_event_title}
                    onChange={(e) => handleChange('bride_event_title', e.target.value)}
                    placeholder="Tiêu đề buổi lễ (ví dụ: Lễ Vu Quy)"
                    className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={form.bride_event_date}
                      onChange={(e) => handleChange('bride_event_date', e.target.value)}
                      className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                    />
                    <input
                      type="time"
                      value={form.bride_event_time}
                      onChange={(e) => handleChange('bride_event_time', e.target.value)}
                      className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                    />
                  </div>
                  <input
                    value={form.bride_location}
                    onChange={(e) => handleChange('bride_location', e.target.value)}
                    placeholder="Địa điểm (ví dụ: Nhà hàng ABC)"
                    className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                  />
                  <input
                    value={form.bride_address}
                    onChange={(e) => handleChange('bride_address', e.target.value)}
                    placeholder="Địa chỉ cụ thể"
                    className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                  />
                  <textarea
                    value={form.bride_google_map_embed}
                    onChange={(e) => handleChange('bride_google_map_embed', e.target.value)}
                    placeholder="Dán link Google Map hoặc iframe"
                    rows={3}
                    className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                  />

                  {brideMap && (
                    <div className="overflow-hidden rounded-2xl border border-[#f2dec4] shadow-sm">
                      <iframe
                        src={brideMap}
                        title="Bản đồ nhà gái"
                        className="w-full h-56"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[22px] bg-[#fdf5ff] border border-[#eddcf3] p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.22em] text-[#b172c4]">Groom side</p>
                    <h3 className="text-xl font-semibold text-[#5b3a29]">Thông tin nhà trai</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    value={form.groom_event_title}
                    onChange={(e) => handleChange('groom_event_title', e.target.value)}
                    placeholder="Tiêu đề buổi lễ (ví dụ: Lễ Thành Hôn)"
                    className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={form.groom_event_date}
                      onChange={(e) => handleChange('groom_event_date', e.target.value)}
                      className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                    />
                    <input
                      type="time"
                      value={form.groom_event_time}
                      onChange={(e) => handleChange('groom_event_time', e.target.value)}
                      className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                    />
                  </div>
                  <input
                    value={form.groom_location}
                    onChange={(e) => handleChange('groom_location', e.target.value)}
                    placeholder="Địa điểm (ví dụ: Nhà hàng XYZ)"
                    className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                  />
                  <input
                    value={form.groom_address}
                    onChange={(e) => handleChange('groom_address', e.target.value)}
                    placeholder="Địa chỉ cụ thể"
                    className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                  />
                  <textarea
                    value={form.groom_google_map_embed}
                    onChange={(e) => handleChange('groom_google_map_embed', e.target.value)}
                    placeholder="Dán link Google Map hoặc iframe"
                    rows={3}
                    className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                  />

                  {groomMap && (
                    <div className="overflow-hidden rounded-2xl border border-[#ecd3f1] shadow-sm">
                      <iframe
                        src={groomMap}
                        title="Bản đồ nhà trai"
                        className="w-full h-56"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <label className="text-sm text-[#7b5e4b]">Album ảnh (Tải lên trước, Lấy link gán vào sau)</label>
              <div className="rounded-xl border border-[#eedfcc] bg-[#fffaf3] px-1 py-1 text-sm text-[#5b3a29] shadow-sm">
                <ImageUploader weddingId={slug} onUploadSuccess={handleUploadSuccess} />
                <p className="text-xs text-[#9a7d68] mt-2 px-4 pb-2">
                  Bạn có thể tải ảnh lên trước, hệ thống sẽ tự động ghép ảnh vào album thiệp.
                  (Đã tải lên {uploadedImages.length} ảnh)
                </p>
              </div>
            </section>

            <div className="bg-[#fff4e0] border border-[#f6d9a7] rounded-xl px-4 py-3 text-sm text-[#b9772b] flex items-center justify-between flex-wrap gap-2">
              <span>Slug sẽ được tạo tự động:</span>
              <span className="font-semibold">/{slug}</span>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-[#f0b45b] via-[#ee9c47] to-[#e6873f] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-200/70 transition duration-200 hover:brightness-105 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? 'Đang tạo thiệp & tải ảnh...' : 'Tạo thiệp'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
