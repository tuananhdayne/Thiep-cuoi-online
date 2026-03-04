type HeroProps = {
  brideName: string
  groomName: string
  introDescription?: string | null
  weddingDate?: string | null
  weddingTime?: string | null
  location?: string | null
  address?: string | null
  backgroundImage?: string | null
}

const formatDateTime = (date?: string | null, time?: string | null) => {
  if (!date && !time) return ""

  const datePart = date ? new Date(date) : null
  const formattedDate = datePart
    ? new Intl.DateTimeFormat("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(datePart)
    : ""

  const formattedTime = time
    ? new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(`1970-01-01T${time}`))
    : ""

  return [formattedDate, formattedTime].filter(Boolean).join(" · ")
}

export default function Hero({
  brideName,
  groomName,
  introDescription,
  weddingDate,
  weddingTime,
  location,
  address,
  backgroundImage,
}: HeroProps) {
  const dateTime = formatDateTime(weddingDate, weddingTime)

  return (
    <section className="relative isolate min-h-screen overflow-hidden flex items-center justify-center text-center px-6 py-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fbe9d7] via-[#fffaf4] to-[#f7e8d0]" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: backgroundImage
              ? `linear-gradient(180deg, rgba(255, 248, 243, 0.7), rgba(248, 232, 209, 0.9)), url(${backgroundImage})`
              : "radial-gradient(circle at 20% 20%, rgba(255, 214, 170, 0.25), transparent 32%), radial-gradient(circle at 80% 0%, rgba(255, 182, 193, 0.15), transparent 35%), radial-gradient(circle at 50% 80%, rgba(255, 214, 170, 0.25), transparent 30%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#fdf2e3]/70 to-[#fdf8f3]/90" />
      </div>

      <div className="relative z-10 max-w-3xl space-y-6 animate-fade-in">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-800/70">Wedding Invitation</p>
        <h1 className="font-display text-5xl md:text-6xl text-amber-900 drop-shadow-sm">
          {brideName} <span className="text-amber-600">&</span> {groomName}
        </h1>
        {introDescription && (
          <p className="text-lg text-slate-700 leading-relaxed">
            {introDescription}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
          {dateTime && (
            <div className="paper-card px-6 py-4 text-amber-900">
              <p className="font-semibold">{dateTime}</p>
              <p className="text-amber-700 text-xs mt-1">Thời khắc yêu thương</p>
            </div>
          )}
          {(location || address) && (
            <div className="paper-card px-6 py-4 text-amber-900">
              <p className="font-semibold">{location}</p>
              {address && <p className="text-sm text-amber-700 mt-1">{address}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
