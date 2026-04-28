export const supportedThemes = ['classic', 'heritage', 'midnight', 'elegance', 'romance', 'minimalist', 'luxury'] as const

export type SupportedTheme = (typeof supportedThemes)[number]

export const themeDisplayNames: Record<SupportedTheme, string> = {
  classic: 'Cổ Điển Hoàng Kim',
  heritage: 'Hỷ Sắc Cổ Truyền',
  midnight: 'Dạ Tiệc Ánh Kim',
  elegance: 'Thanh Lịch Tân Cổ Điển',
  romance: 'Đêm Lãng Mạn (Glassmorphism)',
  minimalist: 'Tối Giản Tân Cổ Điển (Typography)',
  luxury: 'Luxury – Truyền Thống Sang Trọng',
}

export function getThemeDisplayName(theme?: string | null) {
  if (theme === 'heritage') return themeDisplayNames.heritage
  if (theme === 'midnight') return themeDisplayNames.midnight
  if (theme === 'elegance') return themeDisplayNames.elegance
  if (theme === 'romance') return themeDisplayNames.romance
  if (theme === 'minimalist') return themeDisplayNames.minimalist
  if (theme === 'luxury') return themeDisplayNames.luxury
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
    case 'classic':
    default:
      return (await import('./ClassicTemplate')).default
  }
}
