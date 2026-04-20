export const supportedThemes = ['classic', 'modern', 'rose', 'ocean', 'garden', 'midnight'] as const

export type SupportedTheme = (typeof supportedThemes)[number]

export async function loadTemplate(theme?: string | null) {
  switch (theme) {
    case 'modern':
      return (await import('./ModernTemplate')).default
    case 'rose':
      return (await import('./RoseTemplate')).default
    case 'ocean':
      return (await import('./OceanTemplate')).default
    case 'garden':
      return (await import('./GardenTemplate')).default
    case 'midnight':
      return (await import('./MidnightTemplate')).default
    case 'classic':
    default:
      return (await import('./ClassicTemplate')).default
  }
}
