'use client'

import { useMemo, useState } from 'react'

const slugifyGuest = (name: string) => {
  const cleaned = name.trim()
  if (!cleaned) return ''
  return cleaned
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-')
}

type InviteGeneratorProps = {
  baseSlug: string
}

export default function InviteGenerator({ baseSlug }: InviteGeneratorProps) {
  const [names, setNames] = useState('')
  const [links, setLinks] = useState<string[]>([])
  const [copying, setCopying] = useState<string | null>(null)

  const parsedNames = useMemo(
    () =>
      names
        .split(/\r?\n/)
        .map((n) => n.trim())
        .filter(Boolean),
    [names]
  )

  const handleGenerate = () => {
    const generated = parsedNames
      .map((n) => slugifyGuest(n))
      .filter(Boolean)
      .map((guestSlug) => `/${baseSlug}/${guestSlug}`)

    setLinks(generated)
  }

  const handleCopy = async (link: string) => {
    try {
      setCopying(link)
      const url = `${window.location.origin}${link}`
      await navigator.clipboard.writeText(url)
    } finally {
      setCopying(null)
    }
  }

  return (
    <div className="space-y-4 bg-white rounded-3xl border border-amber-50 shadow-[0_20px_50px_rgba(92,65,35,0.08)] p-6">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Khách mời</p>
        <h3 className="font-display text-2xl text-[#5b3a29]">Tạo link mời</h3>
        <p className="text-sm text-[#9a7d68]">Nhập mỗi tên một dòng, hệ thống sẽ tạo slug tương ứng.</p>
      </div>

      <textarea
        value={names}
        onChange={(e) => setNames(e.target.value)}
        rows={5}
        placeholder="Ví dụ:\nNgọc Anh\nBảo Minh\nCô chú Hưng"
        className="w-full rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3.5 text-sm text-[#5b3a29] focus:outline-none focus:ring-2 focus:ring-[#f2c87c] focus:border-[#f2c87c] transition"
      />

      <button
        type="button"
        onClick={handleGenerate}
        className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#f0b45b] via-[#ee9c47] to-[#e6873f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200/70 transition hover:brightness-105 hover:-translate-y-0.5"
      >
        Tạo link
      </button>

      {links.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-[#7b5e4b] font-semibold">Danh sách link</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link) => (
              <div
                key={link}
                className="flex items-center justify-between rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3 text-sm text-[#5b3a29] shadow-sm"
              >
                <span className="truncate pr-2">{link}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(link)}
                  className="text-xs font-semibold text-[#b9772b] px-3 py-1 rounded-full bg-[#fff0d8] hover:bg-[#f7e2bf] transition"
                >
                  {copying === link ? 'Đang copy...' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
