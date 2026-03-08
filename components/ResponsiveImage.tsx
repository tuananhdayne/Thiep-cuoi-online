'use client'

import { ImageSizes } from './ImageUploader'

interface ResponsiveImageProps {
    sizes: ImageSizes
    alt: string
    className?: string
    priority?: boolean
}

export default function ResponsiveImage({ sizes, alt, className = '', priority = false }: ResponsiveImageProps) {
    // srcSet provides the browser with a list of image sources and their actual widths
    const srcSet = `
    ${sizes['350']} 350w,
    ${sizes['550']} 550w,
    ${sizes['750']} 750w,
    ${sizes['1200']} 1200w,
    ${sizes.original} 1600w
  `.trim()

    // sizes attribute tells the browser what width the image will occupy at different breakpoints
    // so it can choose the best image from the srcSet BEFORE downloading
    const sizesAttr = `
    (max-width: 640px) 100vw,
    (max-width: 768px) 50vw,
    (max-width: 1200px) 33vw,
    1200px
  `.trim()

    return (
        <img
            src={sizes.original}
            srcSet={srcSet}
            sizes={sizesAttr}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`w-full h-auto ${className}`}
        />
    )
}
