type GalleryImage = {
  id: number | string
  image_url: string
  caption?: string | null
}

type GalleryProps = {
  images: GalleryImage[]
}

export default function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-800/70">Our memories</p>
          <h2 className="font-display text-3xl md:text-4xl text-amber-900">Album ảnh</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <figure
              key={img.id}
              className="group relative overflow-hidden rounded-3xl shadow-[0_14px_40px_rgba(68,53,28,0.12)] bg-white"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={img.image_url}
                  alt={img.caption || "Ảnh cưới"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {img.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent text-white px-4 py-3 text-sm">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
