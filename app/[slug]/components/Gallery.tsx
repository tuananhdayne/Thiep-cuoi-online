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
    <section className="py-16 px-6 bg-[#fffaf3]" id="gallery">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c08a4b]">Our memories</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#5b3a29]">Album ảnh</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {images.map((img) => (
            <figure
              key={img.id}
              className="group relative overflow-hidden rounded-[20px] md:rounded-[28px] shadow-[0_10px_30px_rgba(91,58,41,0.08)] bg-white cursor-pointer"
            >
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img
                  src={img.image_url}
                  alt={img.caption || 'Ảnh cưới'}
                  className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-110 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              {img.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent text-white px-4 py-4 md:py-5 text-xs md:text-sm font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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
