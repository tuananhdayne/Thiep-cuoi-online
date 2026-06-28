'use client'

import { FormEvent, useMemo, useState, Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import ImageUploader from '@/components/ImageUploader'
import SingleImageUploader from '@/components/SingleImageUploader'
import AutoScrollTemplatePreview from '../components/AutoScrollTemplatePreview'
import { getThemeDisplayName, supportedThemes } from '../[slug]/templates/templateLoader'
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
  theme: string
  gift_enabled: boolean
  groom_bank_name: string
  groom_bank_holder: string
  groom_bank_account: string
  groom_bank_qr: string
  bride_bank_name: string
  bride_bank_holder: string
  bride_bank_account: string
  bride_bank_qr: string
}

type UploadedImage = {
  url: string
  path: string
}

type StringFieldKeys = {
  [K in keyof CouplePayload]: CouplePayload[K] extends string ? K : never
}[keyof CouplePayload]

const slugify = (bride: string, groom: string) => {
  const raw = `${bride} ${groom}`.trim() || 'wedding'
  return raw
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
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

const buildEmbedUrl = (mapValue: string, location?: string, address?: string) => {
  const source = mapValue?.trim() || ''

  if (source.includes('/embed')) {
    return source
  }

  if (source && /google\.com\/maps|maps\.google/i.test(source)) {
    return source.includes('output=embed') ? source : `${source}${source.includes('?') ? '&' : '?'}output=embed`
  }

  // If it's a short link or normal link, check if it contains maps.app.goo.gl or goo.gl/maps
  // and prioritize the query search so it doesn't show a broken iframe.
  if (/maps\.app\.goo\.gl|goo\.gl\/maps/i.test(source)) {
    const query = `${location || ''} ${address || ''}`.trim()
    if (query) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
    }
    return '' // return empty instead of broken short link
  }

  const query = `${location || ''} ${address || ''}`.trim()
  if (query) {
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  }

  return ''
}

const requiredFields: StringFieldKeys[] = [
  'bride_name',
  'groom_name',
  'intro_description',
  'wedding_date',
  'wedding_time',
  'bride_event_title',
  'bride_location',
  'bride_address',
  'groom_event_title',
  'groom_location',
  'groom_address',
]

function CreateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestedTheme = searchParams.get('theme')
  const initialTheme =
    requestedTheme && supportedThemes.includes(requestedTheme as (typeof supportedThemes)[number])
      ? requestedTheme
      : 'classic'

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
    bride_event_date: '', // Kept for type backwards compatibility but hidden from UI
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
    theme: initialTheme,
    gift_enabled: false,
    groom_bank_name: '',
    groom_bank_holder: '',
    groom_bank_account: '',
    groom_bank_qr: '',
    bride_bank_name: '',
    bride_bank_holder: '',
    bride_bank_account: '',
    bride_bank_qr: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<{ original: string }[]>([])
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')
  const [previewNonce, setPreviewNonce] = useState(0)
  const previewData = useMemo(
    () => ({
      couple: form,
      images: uploadedImages,
    }),
    [form, uploadedImages]
  )

  const [customSlug, setCustomSlug] = useState('')
  const [isSlugEdited, setIsSlugEdited] = useState(false)

  const autoGeneratedSlug = useMemo(
    () => slugify(form.bride_name, form.groom_name),
    [form.bride_name, form.groom_name]
  )

  useEffect(() => {
    if (!isSlugEdited) {
      setCustomSlug(autoGeneratedSlug)
    }
  }, [autoGeneratedSlug, isSlugEdited])

  const [brideMap, setBrideMap] = useState('')
  const [groomMap, setGroomMap] = useState('')

  useEffect(() => {
    let active = true
    const val = form.bride_google_map_embed
    if (!val) {
      setBrideMap(buildEmbedUrl('', form.bride_location, form.bride_address))
      return
    }

    const src = extractMapSrc(val)
    if (/maps\.app\.goo\.gl|goo\.gl\/maps/i.test(src)) {
      fetch(`/api/resolve-map?url=${encodeURIComponent(src)}`)
        .then((res) => res.json())
        .then((data) => {
          if (!active) return
          if (data.resolvedUrl) {
            setBrideMap(buildEmbedUrl(data.resolvedUrl, form.bride_location, form.bride_address))
          } else {
            setBrideMap(buildEmbedUrl(src, form.bride_location, form.bride_address))
          }
        })
        .catch(() => {
          if (!active) return
          setBrideMap(buildEmbedUrl(src, form.bride_location, form.bride_address))
        })
    } else {
      setBrideMap(buildEmbedUrl(src, form.bride_location, form.bride_address))
    }

    return () => {
      active = false
    }
  }, [form.bride_google_map_embed, form.bride_location, form.bride_address])

  useEffect(() => {
    let active = true
    const val = form.groom_google_map_embed
    if (!val) {
      setGroomMap(buildEmbedUrl('', form.groom_location, form.groom_address))
      return
    }

    const src = extractMapSrc(val)
    if (/maps\.app\.goo\.gl|goo\.gl\/maps/i.test(src)) {
      fetch(`/api/resolve-map?url=${encodeURIComponent(src)}`)
        .then((res) => res.json())
        .then((data) => {
          if (!active) return
          if (data.resolvedUrl) {
            setGroomMap(buildEmbedUrl(data.resolvedUrl, form.groom_location, form.groom_address))
          } else {
            setGroomMap(buildEmbedUrl(src, form.groom_location, form.groom_address))
          }
        })
        .catch(() => {
          if (!active) return
          setGroomMap(buildEmbedUrl(src, form.groom_location, form.groom_address))
        })
    } else {
      setGroomMap(buildEmbedUrl(src, form.groom_location, form.groom_address))
    }

    return () => {
      active = false
    }
  }, [form.groom_google_map_embed, form.groom_location, form.groom_address])

  const openPreview = () => {
    setPreviewNonce(Date.now())
    setViewMode('preview')
  }

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
    if (!customSlug.trim()) {
      return 'Vui lòng nhập đường dẫn thiệp (Slug).'
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

    // Resolve duplicate slug by automatically appending incrementing suffix
    let finalSlug = customSlug.trim()
    
    const { data: existingCouple, error: checkError } = await supabase
      .from('couples')
      .select('id')
      .eq('slug', finalSlug)
      .maybeSingle()

    if (checkError) {
      setError('Không thể kiểm tra đường dẫn thiệp. Vui lòng thử lại.')
      setLoading(false)
      return
    }

    if (existingCouple) {
      let suffix = 1
      let foundUnique = false
      
      while (!foundUnique) {
        const testSlug = `${customSlug}-${suffix}`
        const { data: duplicateCheck, error: dupError } = await supabase
          .from('couples')
          .select('id')
          .eq('slug', testSlug)
          .maybeSingle()
          
        if (dupError) {
          setError('Không thể kiểm tra trùng lặp đường dẫn. Vui lòng thử lại.')
          setLoading(false)
          return
        }
        
        if (!duplicateCheck) {
          finalSlug = testSlug
          foundUnique = true
        } else {
          suffix++
        }
      }
    }

    const payload: Record<string, any> = {
      ...form,
      slug: finalSlug,
    }

    // Clean up empty strings for date/time fields to prevent Postgres errors
    if (!payload.wedding_date) delete payload.wedding_date
    if (!payload.wedding_time) delete payload.wedding_time

    // Extract gift fields from payload to insert into wedding_gifts table separately
    const giftEnabled = payload.gift_enabled
    const weddingGiftPayload = {
      is_enabled: giftEnabled,
      groom_bank_name: payload.groom_bank_name || null,
      groom_bank_holder: payload.groom_bank_holder || null,
      groom_bank_account: payload.groom_bank_account || null,
      groom_bank_qr: payload.groom_bank_qr || null,
      bride_bank_name: payload.bride_bank_name || null,
      bride_bank_holder: payload.bride_bank_holder || null,
      bride_bank_account: payload.bride_bank_account || null,
      bride_bank_qr: payload.bride_bank_qr || null,
    }

    // Extract locations fields
    const locationPayload = {
      bride_event_title: payload.bride_event_title || null,
      bride_location: payload.bride_location || null,
      bride_address: payload.bride_address || null,
      bride_google_map_embed: brideMap || null,
      bride_event_date: payload.bride_event_date || null,
      bride_event_time: payload.bride_event_time || null,
      groom_event_title: payload.groom_event_title || null,
      groom_location: payload.groom_location || null,
      groom_address: payload.groom_address || null,
      groom_google_map_embed: groomMap || null,
      groom_event_date: payload.groom_event_date || null,
      groom_event_time: payload.groom_event_time || null,
    }

    // Remove gift fields from couple payload
    delete payload.gift_enabled
    delete payload.groom_bank_name
    delete payload.groom_bank_holder
    delete payload.groom_bank_account
    delete payload.groom_bank_qr
    delete payload.bride_bank_name
    delete payload.bride_bank_holder
    delete payload.bride_bank_account
    delete payload.bride_bank_qr

    // Remove location fields from couple payload
    delete payload.bride_event_title
    delete payload.bride_location
    delete payload.bride_address
    delete payload.bride_event_date
    delete payload.bride_event_time
    delete payload.bride_google_map_embed
    delete payload.groom_event_title
    delete payload.groom_location
    delete payload.groom_address
    delete payload.groom_event_date
    delete payload.groom_event_time
    delete payload.groom_google_map_embed


    const { data: coupleRow, error: insertError } = await supabase
      .from('couples')
      .insert(payload as any)
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

    // Insert into locations table
    const { error: locationsError } = await supabase
      .from('locations')
      .insert({ couple_id: coupleRow.id, ...locationPayload })

    if (locationsError) {
      console.error('Lỗi lưu locations:', locationsError)
    }

    // Insert into wedding_gifts table
    const { error: giftError } = await supabase
      .from('wedding_gifts')
      .insert({ couple_id: coupleRow.id, ...weddingGiftPayload })

    if (giftError) {
      console.error(giftError)
      setError('Tạo thiệp thành công nhưng lỗi lưu hộp mừng cưới.')
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

    router.push(`/${finalSlug}`)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-white border-b flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-[#5b3a29]">
          {viewMode === 'preview' ? 'Xem trước thiệp cưới' : 'Tạo thiệp cưới'}
        </h2>
        <div className="inline-flex rounded-lg bg-white/80 p-1 border">
          <button type="button" onClick={() => setViewMode('edit')} className={`px-3 py-1 text-sm rounded ${viewMode === 'edit' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}>
            Chỉnh sửa
          </button>
          <button type="button" onClick={openPreview} className={`px-3 py-1 text-sm rounded ${viewMode === 'preview' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}>
            Xem trước
          </button>
        </div>
      </div>

      {viewMode === 'preview' ? (
        <main className="fixed inset-0 z-50 bg-[#f8f3ec] flex flex-col pt-16">
          <div className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Phone mockup on desktop, full screen on mobile */}
            <div className="w-full h-full md:w-[390px] md:h-[820px] md:bg-[#1e1915] md:rounded-[52px] md:p-[12px] md:shadow-[0_25px_60px_rgba(75,48,36,0.3)] md:border md:border-[#4b3c36]/25 relative flex flex-col">
              {/* Speaker/Camera notch (hidden on mobile) */}
              <div className="hidden md:flex absolute top-4 left-1/2 transform -translate-x-1/2 w-[110px] h-[24px] bg-[#1e1915] rounded-full z-20 items-center justify-center gap-1.5 px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                <span className="h-1 w-10 rounded-full bg-neutral-900" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
              </div>

              {/* Screen container */}
              <div className="flex-1 w-full h-full overflow-hidden md:rounded-[42px] bg-white relative">
                <AutoScrollTemplatePreview
                  src={`/demo?theme=${encodeURIComponent(form.theme)}&embedded=1&v=${previewNonce}`}
                  title="Preview"
                  autoScroll={false}
                  previewData={previewData}
                />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main
          className="pt-24 min-h-screen flex items-center justify-center px-4 py-14"
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
                  Điền chi tiết buổi lễ của hai bên để tạo thiệp cưới.
                </p>
              </div>

              <div className="space-y-8">
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
                  <div className="hidden">
                    {/* Hiding old separate date/time fields visually but not from React State completely in case needed */}
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
                  <p className="text-[11px] text-[#8c7161] leading-relaxed">
                    💡 Hướng dẫn: Nên dán <strong>Mã nhúng bản đồ (Iframe)</strong> từ Google Maps. Nếu dán link rút gọn chia sẻ (maps.app.goo.gl), hệ thống sẽ hiển thị theo địa chỉ nhập ở trên.
                  </p>

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
                  <div className="hidden">
                    {/* Hiding old separate date/time fields visually but not from React State completely in case needed */}
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
                  <p className="text-[11px] text-[#8c7161] leading-relaxed">
                    💡 Hướng dẫn: Nên dán <strong>Mã nhúng bản đồ (Iframe)</strong> từ Google Maps. Nếu dán link rút gọn chia sẻ (maps.app.goo.gl), hệ thống sẽ hiển thị theo địa chỉ nhập ở trên.
                  </p>

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

            {/* Theme selection removed: choose theme from homepage. Keep hidden input so form still posts the theme. */}
            <input type="hidden" name="theme" value={form.theme} />
            <div className="text-sm text-[#7b5e4b]">Mẫu thiệp được chọn trên trang chủ. Hiện tại: <strong className="ml-2">{getThemeDisplayName(form.theme)}</strong></div>

            {/* Gift Box Toggle & Bank Details */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-[#7b5e4b] font-medium">Hộp mừng cưới</label>
                  <p className="text-xs text-[#9a7d68] mt-0.5">Hiển thị thông tin chuyển khoản trên thiệp</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, gift_enabled: !prev.gift_enabled }))}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${form.gift_enabled ? 'bg-[#c08a4b]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${form.gift_enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {form.gift_enabled && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in">
                  {/* Groom bank */}
                  <div className="rounded-[22px] bg-[#fdf5ff] border border-[#eddcf3] p-5 space-y-3 shadow-sm">
                    <div>
                      <p className="text-[13px] uppercase tracking-[0.22em] text-[#b172c4]">Groom</p>
                      <h3 className="text-lg font-semibold text-[#5b3a29]">Mừng cưới đến chú rể</h3>
                    </div>
                    <input
                      value={form.groom_bank_name}
                      onChange={(e) => handleChange('groom_bank_name', e.target.value)}
                      placeholder="Tên ngân hàng (VD: Vietcombank)"
                      className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                    />
                    <input
                      value={form.groom_bank_holder}
                      onChange={(e) => handleChange('groom_bank_holder', e.target.value)}
                      placeholder="Tên chủ tài khoản"
                      className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                    />
                    <input
                      value={form.groom_bank_account}
                      onChange={(e) => handleChange('groom_bank_account', e.target.value)}
                      placeholder="Số tài khoản"
                      className="w-full rounded-xl border border-[#eddcf3] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#d9b1eb]"
                    />
                    {!form.groom_bank_qr ? (
                      <SingleImageUploader 
                        weddingId={customSlug || 'new-wedding'} 
                        label="Tải ảnh QR chú rể" 
                        onUploadSuccess={(url) => handleChange('groom_bank_qr', url)} 
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <img src={form.groom_bank_qr} alt="QR chú rể" className="w-32 h-32 object-contain rounded-xl border border-[#eddcf3]" />
                        <button type="button" onClick={() => handleChange('groom_bank_qr', '')} className="text-xs text-red-500 hover:underline">Xoá ảnh</button>
                      </div>
                    )}
                  </div>

                  {/* Bride bank */}
                  <div className="rounded-[22px] bg-[#fff7ed] border border-[#f6e2c6] p-5 space-y-3 shadow-sm">
                    <div>
                      <p className="text-[13px] uppercase tracking-[0.22em] text-[#c58645]">Bride</p>
                      <h3 className="text-lg font-semibold text-[#5b3a29]">Mừng cưới đến cô dâu</h3>
                    </div>
                    <input
                      value={form.bride_bank_name}
                      onChange={(e) => handleChange('bride_bank_name', e.target.value)}
                      placeholder="Tên ngân hàng (VD: Vietcombank)"
                      className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                    />
                    <input
                      value={form.bride_bank_holder}
                      onChange={(e) => handleChange('bride_bank_holder', e.target.value)}
                      placeholder="Tên chủ tài khoản"
                      className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                    />
                    <input
                      value={form.bride_bank_account}
                      onChange={(e) => handleChange('bride_bank_account', e.target.value)}
                      placeholder="Số tài khoản"
                      className="w-full rounded-xl border border-[#eedfcc] bg-white px-4 py-3 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c]"
                    />
                    {!form.bride_bank_qr ? (
                      <SingleImageUploader 
                        weddingId={customSlug || 'new-wedding'} 
                        label="Tải ảnh QR cô dâu" 
                        onUploadSuccess={(url) => handleChange('bride_bank_qr', url)} 
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <img src={form.bride_bank_qr} alt="QR cô dâu" className="w-32 h-32 object-contain rounded-xl border border-[#eedfcc]" />
                        <button type="button" onClick={() => handleChange('bride_bank_qr', '')} className="text-xs text-red-500 hover:underline">Xoá ảnh</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-3">
              <label className="text-sm text-[#7b5e4b] font-medium">Album ảnh (Tải lên trước, Lấy link gán vào sau)</label>
              <div className="rounded-xl border border-[#eedfcc] bg-[#fffaf3] px-1 py-1 text-sm text-[#5b3a29] shadow-sm">
                <ImageUploader weddingId={customSlug} onUploadSuccess={handleUploadSuccess} />
                <p className="text-xs text-[#9a7d68] mt-2 px-4 pb-2">
                  Bạn có thể tải ảnh lên trước, hệ thống sẽ tự động ghép ảnh vào album thiệp.
                  (Đã tải lên {uploadedImages.length} ảnh)
                </p>
              </div>
            </section>

            <div className="space-y-2">
              <label htmlFor="custom-slug" className="text-sm text-[#7b5e4b] font-medium">
                Đường dẫn thiệp (Slug)
              </label>
              <div className="flex rounded-2xl border border-[#eedfcc] bg-[#fffaf3] overflow-hidden focus-within:ring-2 focus-within:ring-[#f2c87c] transition">
                <span className="flex items-center bg-[#fbf5eb] border-r border-[#eedfcc] px-4 text-sm text-[#9a7d68] select-none font-medium">
                  /
                </span>
                <input
                  id="custom-slug"
                  type="text"
                  value={customSlug}
                  onChange={(e) => {
                    const val = e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, '')
                    setCustomSlug(val)
                    setIsSlugEdited(true)
                  }}
                  className="flex-1 bg-transparent px-4 py-3.5 text-sm text-[#5b3a29] font-medium focus:outline-none"
                  placeholder="thu-diu-dac-dai"
                />
              </div>
              <p className="text-xs text-[#9a7d68]">
                Bạn có thể tùy chỉnh đường dẫn nếu muốn làm 2 thiệp khác nhau cho cùng một cặp đôi (ví dụ: thêm <code className="font-mono text-[#b9772b] bg-[#fff4e0] px-1 rounded">-nha-trai</code> hoặc <code className="font-mono text-[#b9772b] bg-[#fff4e0] px-1 rounded">-nha-gai</code>).
              </p>
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
          </div>
        </main>
      )}
    </>
  )
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#9a7d68]">Đang tải...</div>}>
      <CreateForm />
    </Suspense>
  )
}
