export const supportedThemes = ['classic', 'heritage', 'midnight', 'elegance', 'romance', 'minimalist', 'luxury', 'pastel', 'viet-silk', 'botanical', 'midnight-elegance'] as const

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
    case 'classic':
    default:
      return (await import('./ClassicTemplate')).default
  }
}
