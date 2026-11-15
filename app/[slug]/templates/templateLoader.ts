export const supportedThemes = [
  'classic',
  'heritage',
  'midnight',
  'elegance',
  'romance',
  'minimalist',
  'luxury',
  'pastel',
  'viet-silk',
  'botanical',
  'midnight-elegance',
  'burgundy-romance',
  'imperial-harmony',
  'spring-garden',
  'ocean-breeze',
  'sunset-blush',
  'crystal-luxury',
  'golden-vintage',
  'lavender-dream',
  'noir-prestige',
  'lotus-purity',
] as const

export type SupportedTheme = (typeof supportedThemes)[number]

export const themeDisplayNames: Record<SupportedTheme, string> = {
  classic: 'Cổ Điển Hoàng Kim',
  heritage: 'Hỷ Sắc Cổ Truyền',
  midnight: 'Dạ Tiệc Ánh Kim',
  elegance: 'Thanh Lịch Tân Cổ Điển',
  romance: 'Đêm Lãng Mạn (Glassmorphism)',
  minimalist: 'Tối Giản Tân Cổ Điển (Typography)',
  luxury: 'Luxury – Truyền Thống Sang Trọng',
  pastel: 'Pastel – Hàn Quốc Nhẹ Nhàng',
  'viet-silk': 'Gấm Việt Hỷ Hoa',
  botanical: 'Botanical Garden',
  'midnight-elegance': 'Midnight Elegance',
  'burgundy-romance': 'Đỏ Rượu Hoàng Gia (3D Envelope)',
  'imperial-harmony': 'Song Hỷ Cát Tường (Hoàng Triều)',
  'spring-garden': 'Vườn Xuân Thanh Khiết (Sân Vườn)',
  'ocean-breeze': 'Biển Xanh Lãng Mạn (Coastal Beach)',
  'sunset-blush': 'Hoàng Hôn Mộng Mơ (Sunset Blush)',
  'crystal-luxury': 'Pha Lê Ánh Bạc (Crystal Luxury)',
  'golden-vintage': 'Cổ Điển Hoàng Gia (Vintage Paris)',
  'lavender-dream': 'Oải Hương Tím (Lavender Provence)',
  'noir-prestige': 'Dạ Vũ Thượng Lưu (Noir Prestige)',
  'lotus-purity': 'Sen Trắng Đông Dương (Indochine Lotus)',
}

export function getThemeDisplayName(theme?: string | null) {
  if (theme === 'heritage') return themeDisplayNames.heritage
  if (theme === 'midnight') return themeDisplayNames.midnight
  if (theme === 'elegance') return themeDisplayNames.elegance
  if (theme === 'romance') return themeDisplayNames.romance
  if (theme === 'minimalist') return themeDisplayNames.minimalist
  if (theme === 'luxury') return themeDisplayNames.luxury
  if (theme === 'pastel') return themeDisplayNames.pastel
  if (theme === 'viet-silk') return themeDisplayNames['viet-silk']
  if (theme === 'botanical') return themeDisplayNames.botanical
  if (theme === 'midnight-elegance') return themeDisplayNames['midnight-elegance']
  if (theme === 'burgundy-romance') return themeDisplayNames['burgundy-romance']
  if (theme === 'imperial-harmony') return themeDisplayNames['imperial-harmony']
  if (theme === 'spring-garden') return themeDisplayNames['spring-garden']
  if (theme === 'ocean-breeze') return themeDisplayNames['ocean-breeze']
  if (theme === 'sunset-blush') return themeDisplayNames['sunset-blush']
  if (theme === 'crystal-luxury') return themeDisplayNames['crystal-luxury']
  if (theme === 'golden-vintage') return themeDisplayNames['golden-vintage']
  if (theme === 'lavender-dream') return themeDisplayNames['lavender-dream']
  if (theme === 'noir-prestige') return themeDisplayNames['noir-prestige']
  if (theme === 'lotus-purity') return themeDisplayNames['lotus-purity']
  return themeDisplayNames.classic
}

export async function loadTemplate(theme?: string | null) {
  switch (theme) {
    case 'heritage':
      return (await import('./HeritageTemplate')).default
    case 'midnight':
      return (await import('./MidnightTemplate')).default
    case 'elegance':
      return (await import('./EleganceTemplate')).default
    case 'romance':
      return (await import('./MidnightRomanceTemplate')).default
    case 'minimalist':
      return (await import('./MinimalistTemplate')).default
    case 'luxury':
      return (await import('./LuxuryTemplate')).default
    case 'pastel':
      return (await import('./PastelTemplate')).default
    case 'viet-silk':
      return (await import('./VietSilkTemplate')).default
    case 'botanical':
      return (await import('./BotanicalGardenTemplate')).default
    case 'midnight-elegance':
      return (await import('./MidnightEleganceTemplate')).default
    case 'burgundy-romance':
      return (await import('./BurgundyRomanceTemplate')).default
    case 'imperial-harmony':
      return (await import('./ImperialSongHyTemplate')).default
    case 'spring-garden':
      return (await import('./SpringGardenTemplate')).default
    case 'ocean-breeze':
      return (await import('./OceanBreezeTemplate')).default
    case 'sunset-blush':
      return (await import('./SunsetBlushTemplate')).default
    case 'crystal-luxury':
      return (await import('./CrystalLuxuryTemplate')).default
    case 'golden-vintage':
      return (await import('./GoldenVintageTemplate')).default
    case 'lavender-dream':
      return (await import('./LavenderDreamTemplate')).default
    case 'noir-prestige':
      return (await import('./NoirPrestigeTemplate')).default
    case 'lotus-purity':
      return (await import('./LotusPurityTemplate')).default
    case 'classic':
    default:
      return (await import('./ClassicTemplate')).default
  }
}
