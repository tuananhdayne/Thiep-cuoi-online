'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import AutoScrollTemplatePreview from './AutoScrollTemplatePreview'
import { getThemeDisplayName, type SupportedTheme } from '../[slug]/templates/templateLoader'

export type CategoryKey = 'chungdoi' | 'all' | 'traditional' | 'modern' | 'garden' | 'luxury'

export type TemplateCardData = {
  theme: SupportedTheme
  name: string
  eyebrow: string
  description: string
  categories: CategoryKey[]
  tags: string[]
  palette: string
  paletteColors: string[]
  badge: string
  button: string
  featured?: boolean
  isHot?: boolean
}

export const templateCatalogList: TemplateCardData[] = [
  {
    theme: 'burgundy-romance',
    name: 'Đỏ Rượu Hoàng Gia',
    eyebrow: 'Minimalism · Đỏ Rượu Vang',
    description: 'Phong cách tối giản hiện đại với sắc đỏ rượu vang quý phái, mở phong bì 3D nghệ thuật, con dấu sáp vàng và phom vòm thanh lịch.',
    categories: ['chungdoi', 'modern', 'luxury'],
    tags: ['✨ Mở phong bì 3D', '🍷 Đỏ rượu vang', '🎵 Nhạc nền', '🌸 Cánh hoa rơi'],
    palette: 'from-[#511419] via-[#8B1E2D] to-[#FFF7EB]',
    paletteColors: ['#511419', '#8B1E2D', '#FFF7EB'],
    badge: 'bg-[#511419] text-[#ECE4D8] border-[#C9A24A]/40',
    button: 'from-[#511419] to-[#8C3A3F]',
    featured: true,
    isHot: true,
  },
  {
    theme: 'imperial-harmony',
    name: 'Song Hỷ Cát Tường',
    eyebrow: 'Song Hỷ · Đỏ Hoàng Gia',
    description: 'Hỷ sự truyền thống Á Đông với sắc đỏ hoàng triều, dấu sáp Song Hỷ 囍 dát vàng, hoa văn cung đình và lịch hoàng đạo cát tường.',
    categories: ['chungdoi', 'traditional'],
    tags: ['囍 Dấu sáp Song Hỷ', '🏮 Đỏ hoàng gia', '✨ Phong bì 3D', '🌸 Pháo hoa & Hoa bay'],
    palette: 'from-[#8C0000] via-[#920002] to-[#FFE8A4]',
    paletteColors: ['#8C0000', '#920002', '#FFE8A4'],
    badge: 'bg-[#8C0000] text-[#FFE8A4] border-[#FFE8A4]/50',
    button: 'from-[#8C0000] to-[#FFE8A4] text-black',
    featured: true,
    isHot: true,
  },
  {
    theme: 'spring-garden',
    name: 'Vườn Xuân Thanh Khiết',
    eyebrow: 'Vườn Xuân · Xanh Sage Botanical',
    description: 'Tiệc cưới sân vườn ngoài trời với sắc xanh sage dịu mát, lá bạch đàn rơi bồng bềnh, phong bì màu nước và gợi ý dress code.',
    categories: ['chungdoi', 'garden'],
    tags: ['🌿 Xanh Sage dịu mát', '🍃 Lá bạch đàn rơi', '✨ Phong bì màu nước', '👗 Gợi ý dress code'],
    palette: 'from-[#5D6A57] via-[#697A62] to-[#F6F1E8]',
    paletteColors: ['#5D6A57', '#697A62', '#F6F1E8'],
    badge: 'bg-[#5D6A57] text-white border-[#BDCDC1]/40',
    button: 'from-[#5D6A57] to-[#697A62]',
    isHot: true,
  },
  {
    theme: 'golden-vintage',
    name: 'Cổ Điển Hoàng Gia',
    eyebrow: 'Minimalism · Nâu Mocha Cổ Điển',
    description: 'Sắc nâu mocha và giấy da ngả vàng hoài niệm, dấu sáp cổ thư và viền vàng đồng ấm áp chuẩn phong cách châu Âu thanh lịch.',
    categories: ['chungdoi', 'modern'],
    tags: ['📜 Nâu Mocha hoài niệm', '✨ Dấu sáp thư cổ', '🕯️ Viền vàng ấm', '🎵 Acoustic lãng mạn'],
    palette: 'from-[#7C6A60] via-[#827771] to-[#FFF7F3]',
    paletteColors: ['#7C6A60', '#827771', '#FFF7F3'],
    badge: 'bg-[#7C6A60] text-[#FFF7F3] border-[#E1BC7C]/40',
    button: 'from-[#7C6A60] to-[#E1BC7C]',
    isHot: true,
  },
  {
    theme: 'sunset-blush',
    name: 'Hoàng Hôn Mộng Mơ',
    eyebrow: 'Tơ Duyên · Hồng San Hô',
    description: 'Gam màu hồng san hô ngọt ngào, ánh ráng chiều ấm áp, mở phong bì hoa đào bồng bềnh và khung ảnh vòm lãng mạn.',
    categories: ['chungdoi', 'garden'],
    tags: ['🌸 Hồng san hô ngọt ngào', '🌅 Ráng chiều hoàng hôn', '✨ Phong bì đào phai', '💖 Khung vòm tình yêu'],
    palette: 'from-[#E66474] via-[#DDA9B8] to-[#FEFBF4]',
    paletteColors: ['#E66474', '#DDA9B8', '#FEFBF4'],
    badge: 'bg-[#E66474] text-white border-[#F3DFC3]/40',
    button: 'from-[#E66474] to-[#842E35]',
    isHot: true,
  },
  {
    theme: 'crystal-luxury',
    name: 'Pha Lê Ánh Bạc',
    eyebrow: 'Cẩm Thạch · Vàng Hổ Phách',
    description: 'Vân cẩm thạch sang trọng hòa quyện cùng sắc vàng hổ phách, dấu sáp kim cương và không gian tiệc cưới xa hoa tột bậc.',
    categories: ['chungdoi', 'modern', 'luxury'],
    tags: ['💎 Vân cẩm thạch xa hoa', '✨ Vàng hổ phách', '👑 Dấu sáp kim cương', '🥂 Tiệc cưới đẳng cấp'],
    palette: 'from-[#1E1E1E] via-[#A78555] to-[#FFFDF8]',
    paletteColors: ['#1E1E1E', '#A78555', '#FFFDF8'],
    badge: 'bg-[#1E1E1E] text-[#A78555] border-[#A78555]/40',
    button: 'from-[#A78555] to-[#1E1E1E]',
    isHot: true,
  },
  {
    theme: 'ocean-breeze',
    name: 'Biển Xanh Lãng Mạn',
    eyebrow: 'Minimalism · Lam Đậm Đại Dương',
    description: 'Sắc xanh navy sâu thẳm phối viền kem ngà, phong bì 3D đại dương lộng gió, con dấu vỏ sò và dress code biển thanh lịch.',
    categories: ['chungdoi', 'luxury', 'modern'],
    tags: ['🌊 Lam đậm đại dương', '🐚 Dấu sáp vỏ sò', '🏖️ Tiệc cưới bãi biển', '✨ Phong bì biển lộng'],
    palette: 'from-[#00224C] via-[#0F4C81] to-[#F7F5EE]',
    paletteColors: ['#00224C', '#0F4C81', '#F7F5EE'],
    badge: 'bg-[#00224C] text-[#F7F5EE] border-[#B58B2F]/40',
    button: 'from-[#00224C] to-[#B58B2F]',
    isHot: true,
  },
  {
    theme: 'lavender-dream',
    name: 'Oải Hương Tím',
    eyebrow: 'Minimalism · Tím Oải Hương',
    description: 'Sắc tím lavender dịu dàng của thảo nguyên miền Nam nước Pháp, cánh hoa bay nhẹ nhàng và thông điệp tình yêu son sắt.',
    categories: ['chungdoi', 'garden'],
    tags: ['💜 Tím Lavender Provence', '🌸 Cánh hoa oải hương', '✨ Phong bì Lavender', '💌 Thơ tình son sắt'],
    palette: 'from-[#7869A0] via-[#C4B5DD] to-white',
    paletteColors: ['#7869A0', '#C4B5DD', '#FFFFFF'],
    badge: 'bg-[#7869A0] text-white border-[#C4B5DD]/40',
    button: 'from-[#7869A0] to-[#5D5082]',
    isHot: true,
  },
  {
    theme: 'noir-prestige',
    name: 'Dạ Vũ Thượng Lưu',
    eyebrow: 'Baroque V2 · Đỏ Đậm Dạ Vũ',
    description: 'Tông đỏ đen rượu vang baroque kết hợp vàng champagne hoàng gia, dấu sáp vương miện và phong cách tiệc cưới quý tộc lộng lẫy.',
    categories: ['chungdoi', 'luxury'],
    tags: ['🎭 Baroque đỏ đen rượu', '👑 Vương miện hoàng gia', '✨ Vàng Champagne', '🥂 Quý tộc lộng lẫy'],
    palette: 'from-[#2B0303] via-[#511419] to-[#FFDFAF]',
    paletteColors: ['#2B0303', '#511419', '#FFDFAF'],
    badge: 'bg-[#2B0303] text-[#FFDFAF] border-[#FFDFAF]/50',
    button: 'from-[#FFDFAF] to-[#C59D5F] text-[#2B0303]',
    isHot: true,
  },
  {
    theme: 'lotus-purity',
    name: 'Sen Trắng Đông Dương',
    eyebrow: 'Liên Hoa V2 · Xanh Sen Ngọc',
    description: 'Vẻ đẹp thanh tao của đóa sen ngọc bích Đông Dương, hòa quyện cùng sắc xanh cốm non và nét hoài cổ tao nhã thuần khiết.',
    categories: ['chungdoi', 'traditional'],
    tags: ['🪷 Sen ngọc Đông Dương', '🌿 Xanh cốm thanh nhã', '✨ Phong bì sen thơm', '🕊️ Nét đẹp thuần khiết'],
    palette: 'from-[#124D00] via-[#5E813C] to-[#FFFBED]',
    paletteColors: ['#124D00', '#5E813C', '#FFFBED'],
    badge: 'bg-[#124D00] text-[#FFFBED] border-[#5E813C]/40',
    button: 'from-[#124D00] to-[#5E813C]',
    isHot: true,
  },
  {
    theme: 'viet-silk',
    name: 'Gấm Việt Hỷ Hoa',
    eyebrow: 'Gấm Việt · Hoa sen',
    description: 'Đỏ son, kem lụa và vàng đồng kết hợp hoa sen, mây cổ và tinh thần thiệp hỷ Việt Nam.',
    categories: ['traditional'],
    tags: ['🏮 Gấm đỏ son', '📜 Mây cổ & Hoa sen', '✨ Thiệp hỷ Việt'],
    palette: 'from-[#f0d7b0] via-[#fff4df] to-[#a92f35]',
    paletteColors: ['#f0d7b0', '#fff4df', '#a92f35'],
    badge: 'bg-[#fff5df]/90 text-[#7d1f25] border-[#d7ad69]/50',
    button: 'from-[#7d1f25] to-[#b78449]',
  },
  {
    theme: 'luxury',
    name: 'Luxury Truyền Thống',
    eyebrow: 'Hỷ sắc · Quyền quý',
    description: 'Đỏ đô và vàng kim tạo nên không khí hỷ sự truyền thống, nổi bật và đầy trang trọng.',
    categories: ['traditional', 'luxury'],
    tags: ['👑 Hỷ sắc đỏ đô', '✨ Dát kim hoàng gia', '🏮 Trang trọng quý phái'],
    palette: 'from-[#8f2028] via-[#b7373f] to-[#f0cda0]',
    paletteColors: ['#8f2028', '#b7373f', '#f0cda0'],
    badge: 'bg-[#fff5dc]/90 text-[#8b2229] border-[#f1d39a]/60',
    button: 'from-[#a62932] to-[#d7a447]',
  },
  {
    theme: 'heritage',
    name: 'Hỷ Sắc Cổ Truyền',
    eyebrow: 'Tinh hoa Việt · Thanh nhã',
    description: 'Hoa văn truyền thống trên nền ngọc trầm, cân bằng giữa nét Việt và thẩm mỹ hiện đại.',
    categories: ['traditional'],
    tags: ['🌿 Tinh hoa Việt', '✨ Nền ngọc trầm', '🏮 Hỷ sự thanh nhã'],
    palette: 'from-[#dcece7] via-[#f2f8f5] to-[#c7ddd5]',
    paletteColors: ['#dcece7', '#f2f8f5', '#c7ddd5'],
    badge: 'bg-white/80 text-[#174a43] border-[#174a43]/15',
    button: 'from-[#174a43] to-[#2a8b7e]',
  },
  {
    theme: 'classic',
    name: 'Cổ Điển Hoàng Kim',
    eyebrow: 'Ấm áp · Trang trọng',
    description: 'Sắc nâu và vàng cổ điển, dành cho một lễ cưới trang trọng nhưng vẫn gần gũi.',
    categories: ['modern', 'luxury'],
    tags: ['📜 Nâu vàng hoàng kim', '✨ Cổ điển ấm áp', '🥂 Trang trọng gần gũi'],
    palette: 'from-[#f8ecdc] via-[#fffaf3] to-[#ead2b5]',
    paletteColors: ['#f8ecdc', '#fffaf3', '#ead2b5'],
    badge: 'bg-white/80 text-[#654430] border-[#8f6246]/15',
    button: 'from-[#6b4632] to-[#b77d47]',
  },
  {
    theme: 'elegance',
    name: 'Thanh Lịch Tân Cổ Điển',
    eyebrow: 'Tân cổ điển · Tinh tế',
    description: 'Nhiều khoảng thở, typography thanh lịch và những đường viền vàng đồng nhẹ nhàng.',
    categories: ['modern'],
    tags: ['✨ Tân cổ điển tinh tế', '⚜️ Viền vàng đồng', '📖 Typography thanh lịch'],
    palette: 'from-[#eee9df] via-[#faf8f4] to-[#ddd3c1]',
    paletteColors: ['#eee9df', '#faf8f4', '#ddd3c1'],
    badge: 'bg-white/80 text-[#3b3731] border-[#b39a6a]/20',
    button: 'from-[#75654a] to-[#b39a6a]',
  },
  {
    theme: 'minimalist',
    name: 'Tối Giản Thời Thượng',
    eyebrow: 'Tối giản · Thời thượng',
    description: 'Bố cục sạch, chữ đẹp và đường nét chuẩn mực để mọi thông tin luôn dễ đọc và nổi bật.',
    categories: ['modern'],
    tags: ['🤍 Tối giản thời thượng', '✨ Bố cục sạch thoáng', '📐 Tỷ lệ vàng thiết kế'],
    palette: 'from-[#e8e5de] via-[#fdfbf7] to-[#d9d5cc]',
    paletteColors: ['#e8e5de', '#fdfbf7', '#d9d5cc'],
    badge: 'bg-white/80 text-[#2d3748] border-black/10',
    button: 'from-[#26313e] to-[#596777]',
  },
  {
    theme: 'pastel',
    name: 'Pastel Hàn Quốc',
    eyebrow: 'Hàn Quốc · Nhẹ nhàng',
    description: 'Sage, nude và watercolor mềm mại cho một tấm thiệp trong trẻo, trẻ trung và giàu cảm xúc.',
    categories: ['garden'],
    tags: ['🌸 Hàn Quốc nhẹ nhàng', '🎨 Watercolor màu nước', '🌿 Sage & Nude trong trẻo'],
    palette: 'from-[#e3eeea] via-[#fbf8f3] to-[#eddcdd]',
    paletteColors: ['#e3eeea', '#fbf8f3', '#eddcdd'],
    badge: 'bg-white/80 text-[#60736e] border-[#8ca89f]/20',
    button: 'from-[#78978f] to-[#a8c3bc]',
  },
  {
    theme: 'botanical',
    name: 'Botanical Garden',
    eyebrow: 'Garden wedding · Lãng mạn',
    description: 'Khu vườn châu Âu với eucalyptus, olive, hoa trắng và bảng màu sage dịu nhẹ, thanh lịch.',
    categories: ['garden'],
    tags: ['🌿 Garden Wedding', '🍃 Eucalyptus & Olive', '🕊️ Vườn hoa thanh lịch'],
    palette: 'from-[#dce4d5] via-[#f8f4e9] to-[#d9c8b4]',
    paletteColors: ['#dce4d5', '#f8f4e9', '#d9c8b4'],
    badge: 'bg-[#fffdf7]/90 text-[#4d5a45] border-[#aab8a0]/45',
    button: 'from-[#647258] to-[#a8976d]',
  },
  {
    theme: 'romance',
    name: 'Đêm Lãng Mạn',
    eyebrow: 'Lãng mạn · Huyền ảo',
    description: 'Glassmorphism, sắc hồng đêm và hiệu ứng ánh sáng cho một câu chuyện tình đầy cảm xúc.',
    categories: ['garden', 'luxury'],
    tags: ['✨ Glassmorphism lung linh', '💖 Hồng đêm huyền ảo', '🌌 Ánh sáng nhiệm màu'],
    palette: 'from-[#160e1c] via-[#2c1737] to-[#120a18]',
    paletteColors: ['#160e1c', '#2c1737', '#120a18'],
    badge: 'bg-rose-300/10 text-rose-100 border-rose-200/15',
    button: 'from-[#a83f69] to-[#e06f93]',
  },
  {
    theme: 'midnight',
    name: 'Dạ Tiệc Ánh Kim',
    eyebrow: 'Điện ảnh · Sang trọng',
    description: 'Nền đêm sâu cùng ánh kim tinh tế, phù hợp với tiệc tối và không gian cao cấp.',
    categories: ['luxury'],
    tags: ['🌌 Điện ảnh sang trọng', '✨ Nền đêm & Ánh kim', '🍸 Dạ tiệc cao cấp'],
    palette: 'from-[#121b26] via-[#1c2937] to-[#0a1017]',
    paletteColors: ['#121b26', '#1c2937', '#0a1017'],
    badge: 'bg-white/10 text-[#f5e8d2] border-white/10',
    button: 'from-[#b98c52] to-[#e0bd83]',
  },
  {
    theme: 'midnight-elegance',
    name: 'Midnight Elegance',
    eyebrow: 'Ballroom · Champagne glow',
    description: 'Dạ tiệc cưới buổi tối với navy sâu, đen than, ánh pha lê và vàng champagne sang trọng.',
    categories: ['luxury'],
    tags: ['🍾 Champagne Ballroom', '✨ Navy sâu & Pha lê', '👑 Tiệc tối thượng lưu'],
    palette: 'from-[#070b12] via-[#0f172a] to-[#d4af7f]',
    paletteColors: ['#070b12', '#0f172a', '#d4af7f'],
    badge: 'bg-[#111827]/80 text-[#f8f8f2] border-[#d4af7f]/30',
    button: 'from-[#111827] to-[#d4af7f]',
  },
]

const categories: { key: CategoryKey; label: string; icon: string }[] = [
  { key: 'all', label: 'Tất Cả (21 Mẫu)', icon: '✨' },
  { key: 'chungdoi', label: '10 Mẫu Mới Nhất 2026', icon: '🔥' },
  { key: 'traditional', label: 'Truyền Thống & Song Hỷ', icon: '🏮' },
  { key: 'modern', label: 'Hiện Đại & Tối Giản', icon: '📐' },
  { key: 'garden', label: 'Lãng Mạn & Sân Vườn', icon: '🌿' },
  { key: 'luxury', label: 'Sang Trọng & Dạ Vũ', icon: '👑' },
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M14 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

export default function TemplateCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')
  const [quickViewTheme, setQuickViewTheme] = useState<SupportedTheme | null>(null)

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return templateCatalogList
    return templateCatalogList.filter((item) => item.categories.includes(activeCategory))
  }, [activeCategory])

  // Get index in current filtered list or full list for next/prev
  const currentModalIndex = useMemo(() => {
    if (!quickViewTheme) return -1
    return filteredTemplates.findIndex((t) => t.theme === quickViewTheme)
  }, [quickViewTheme, filteredTemplates])

  const handleNextModalTheme = useCallback(() => {
    if (currentModalIndex === -1) return
    const nextIdx = (currentModalIndex + 1) % filteredTemplates.length
    setQuickViewTheme(filteredTemplates[nextIdx].theme)
  }, [currentModalIndex, filteredTemplates])

  const handlePrevModalTheme = useCallback(() => {
    if (currentModalIndex === -1) return
    const prevIdx = (currentModalIndex - 1 + filteredTemplates.length) % filteredTemplates.length
    setQuickViewTheme(filteredTemplates[prevIdx].theme)
  }, [currentModalIndex, filteredTemplates])

  // Keyboard navigation for modal
  useEffect(() => {
    if (!quickViewTheme) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewTheme(null)
      if (e.key === 'ArrowRight') handleNextModalTheme()
      if (e.key === 'ArrowLeft') handlePrevModalTheme()
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [quickViewTheme, handleNextModalTheme, handlePrevModalTheme])

  return (
    <div>
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {categories.map((cat) => {
          const count =
            cat.key === 'all'
              ? templateCatalogList.length
              : templateCatalogList.filter((t) => t.categories.includes(cat.key)).length
          const isActive = activeCategory === cat.key

          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs md:text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-[#513426] text-white shadow-[0_8px_24px_rgba(81,52,38,0.25)] scale-[1.02]'
                  : 'bg-white/80 text-[#694d3f] border border-[#7d5d49]/15 hover:bg-white hover:border-[#ad7547]/40 hover:text-[#40291f]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isActive ? 'bg-[#ad7547] text-white' : 'bg-[#f4ebe1] text-[#7d5d49]'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filter summary status */}
      <div className="mt-8 flex items-center justify-between border-b border-[#775541]/10 pb-4">
        <p className="text-xs md:text-sm text-[#7b6253]">
          Hiển thị <strong className="text-[#40291f]">{filteredTemplates.length}</strong> mẫu thiệp cưới cao cấp
        </p>
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#9a7a64]">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Rê chuột để tự động cuộn · Bấm để xem nhanh
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template, index) => {
            return (
              <motion.article
                key={template.theme}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
                className={`group overflow-hidden rounded-[32px] border border-[#5c3b28]/10 bg-white shadow-[0_14px_50px_rgba(76,50,36,0.07)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(76,50,36,0.15)] ${
                  template.featured && filteredTemplates.length > 2 ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`grid ${template.featured && filteredTemplates.length > 2 ? 'lg:grid-cols-[0.8fr_1.2fr]' : ''}`}>
                  {/* Phone Mockup Frame */}
                  <div
                    className={`relative flex min-h-[560px] items-center justify-center overflow-hidden bg-gradient-to-br ${template.palette} px-6 py-12`}
                  >
                    <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#3c2921_0.7px,transparent_0.7px)] [background-size:16px_16px]" />

                    {/* Badge top-left */}
                    <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-sm backdrop-blur-md ${template.badge}`}
                      >
                        #{String(index + 1).padStart(2, '0')} · {template.name}
                      </span>
                      {template.isHot && (
                        <span className="rounded-full bg-amber-500/90 text-stone-950 font-bold px-2.5 py-1 text-[10px] uppercase tracking-wider shadow-sm border border-amber-300">
                          HOT 2026
                        </span>
                      )}
                    </div>

                    {/* Smartphone Mockup */}
                    <div
                      onClick={() => setQuickViewTheme(template.theme)}
                      className="group/phone relative h-[500px] w-[260px] overflow-hidden rounded-[36px] border-[10px] border-[#1e1915] bg-[#1e1915] shadow-2xl transition-all duration-500 group-hover:scale-[1.025] cursor-pointer"
                    >
                      {/* Dynamic Island / Notch */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-[#1e1915] rounded-full z-30 pointer-events-none" />

                      {/* Floating Hover Indicator Badge */}
                      <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center pointer-events-none transition-all duration-300 opacity-90 group-hover/phone:opacity-100 group-hover/phone:scale-105">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md border border-white/20">
                          <EyeIcon /> Bấm để xem nhanh
                        </span>
                      </div>

                      {/* AutoScroll Iframe */}
                      <AutoScrollTemplatePreview
                        src={`/demo?theme=${template.theme}&embedded=1`}
                        title={`${template.name} preview`}
                        hoverScroll={true}
                        interactive={false}
                        onPreviewClick={() => setQuickViewTheme(template.theme)}
                      />
                    </div>
                  </div>

                  {/* Card Content & CTAs */}
                  <div
                    className={`flex flex-col justify-between p-7 md:p-9 ${
                      template.featured && filteredTemplates.length > 2 ? 'lg:p-12' : ''
                    }`}
                  >
                    <div>
                      {/* Eyebrow */}
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ae8060]">
                          {template.eyebrow}
                        </p>
                        {/* Palette Color Swatches */}
                        <div className="flex items-center gap-1.5" title="Bảng màu chủ đạo">
                          {template.paletteColors.map((color, i) => (
                            <span
                              key={i}
                              className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 font-display text-3xl tracking-[-0.02em] text-[#40291f]">
                        {template.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-4 text-sm leading-7 text-[#7b6253]">{template.description}</p>

                      {/* Feature Chips */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {template.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-lg border border-[#654634]/10 bg-[#faf6f0] px-2.5 py-1 text-xs font-medium text-[#654634]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-[#654634]/10">
                      {/* Quick View Button */}
                      <button
                        type="button"
                        onClick={() => setQuickViewTheme(template.theme)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#654634]/20 bg-[#faf7f2] px-4 py-3 text-sm font-semibold text-[#604536] transition-all hover:border-[#ad7547] hover:bg-white hover:text-[#ad7547]"
                      >
                        <EyeIcon /> Xem nhanh
                      </button>

                      {/* Open Full Tab Button */}
                      <Link
                        href={`/demo?theme=${template.theme}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#654634]/15 bg-white px-3 py-3 text-xs font-medium text-[#7d5d49] transition hover:bg-[#faf6f0] hover:text-[#40291f]"
                        title="Mở toàn màn hình tab mới"
                      >
                        <span>Tab mới</span>
                        <ExternalIcon />
                      </Link>

                      {/* Choose & Create Button */}
                      <Link
                        href={`/create?theme=${template.theme}`}
                        className={`group/button ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-xl ${template.button}`}
                      >
                        Chọn mẫu này
                        <span className="transition-transform group-hover/button:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Quick View Modal (iPhone 16 Pro mockup) */}
      <AnimatePresence>
        {quickViewTheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewTheme(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 flex flex-col items-center max-h-[96vh] w-full max-w-[500px]"
            >
              {/* Top Modal Controls */}
              <div className="mb-3 flex w-full items-center justify-between rounded-full bg-stone-900/90 px-4 py-2.5 text-white shadow-xl backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-amber-400 px-2 py-0.5 font-bold text-stone-950">
                    {currentModalIndex + 1}/{filteredTemplates.length}
                  </span>
                  <span className="font-semibold truncate max-w-[200px] md:max-w-[260px]">
                    {getThemeDisplayName(quickViewTheme)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevModalTheme}
                    className="grid h-8 w-8 place-items-center rounded-full bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white transition"
                    title="Mẫu trước (Phím mũi tên trái)"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextModalTheme}
                    className="grid h-8 w-8 place-items-center rounded-full bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white transition"
                    title="Mẫu sau (Phím mũi tên phải)"
                  >
                    ›
                  </button>
                  <button
                    onClick={() => setQuickViewTheme(null)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-rose-950/80 text-rose-300 hover:bg-rose-900 hover:text-white transition font-bold"
                    title="Đóng (ESC)"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Realistic Phone Frame */}
              <div className="relative h-[78vh] max-h-[760px] w-full max-w-[390px] overflow-hidden rounded-[44px] border-[10px] border-[#1e1915] bg-[#1e1915] shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-[#1e1915] rounded-full z-30 pointer-events-none" />

                {/* Interactive Iframe */}
                <iframe
                  src={`/demo?theme=${quickViewTheme}&open=1&embedded=1`}
                  title={`${getThemeDisplayName(quickViewTheme)} live preview`}
                  className="h-full w-full border-0 bg-white"
                />
              </div>

              {/* Bottom Quick View Action Bar */}
              <div className="mt-3 flex w-full max-w-[390px] items-center gap-2">
                <Link
                  href={`/demo?theme=${quickViewTheme}`}
                  target="_blank"
                  className="flex-1 rounded-full bg-stone-900/90 border border-white/10 px-4 py-2.5 text-center text-xs font-semibold text-stone-200 backdrop-blur hover:bg-stone-800 hover:text-white transition"
                >
                  Toàn màn hình ↗
                </Link>
                <Link
                  href={`/create?theme=${quickViewTheme}`}
                  className="flex-[1.5] inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-center text-xs font-bold text-stone-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition"
                >
                  Chọn mẫu này ngay <ArrowIcon />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
