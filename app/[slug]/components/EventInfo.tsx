type Event = {
  eventTitle?: string | null
  date?: string | null
  time?: string | null
  location?: string | null
  address?: string | null
  mapEmbed?: string | null
}

type EventInfoProps = {
  bride: Event
  groom: Event
}

const normalizeEmbed = (value?: string | null) => {
  const trimmed = value?.trim() || ''
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : ''
}

const EventCard = ({
  label,
  highlight,
  event,
  accent,
}: {
  label: string
  highlight: string
  event: Event
  accent: string
}) => {
  const embedUrl = normalizeEmbed(event.mapEmbed)
  const hasContent =
    event.eventTitle || event.date || event.time || event.location || event.address || embedUrl

  if (!hasContent) return null

  return (
    <div className="rounded-3xl bg-white/95 border border-white shadow-lg shadow-amber-50/50 p-6 md:p-7 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-xs uppercase tracking-[0.22em] ${accent}`}>{label}</p>
          <h3 className="text-xl font-semibold text-[#4a3326]">{highlight}</h3>
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-200 to-rose-100 flex items-center justify-center text-[#5b3a29] font-semibold text-sm shadow-sm">
          LOVE
        </div>
      </div>

      <div className="space-y-2 text-sm text-[#5b3a29]">
        {event.eventTitle && (
          <p className="text-base font-semibold text-[#5b3a29]">{event.eventTitle}</p>
        )}
        {(event.date || event.time) && (
          <p className="text-[#7b5e4b]">{[event.date, event.time].filter(Boolean).join(' · ')}</p>
        )}
        {event.location && <p className="font-medium">{event.location}</p>}
        {event.address && <p className="text-[#7b5e4b]">{event.address}</p>}
      </div>

      {embedUrl && (
        <div className="overflow-hidden rounded-2xl border border-amber-100 shadow-sm">
          <iframe
            src={embedUrl}
            title={`${label} map`}
            className="w-full h-56"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  )
}

export default function EventInfo({ bride, groom }: EventInfoProps) {
  const hasBride =
    bride.eventTitle || bride.date || bride.time || bride.location || bride.address || normalizeEmbed(bride.mapEmbed)
  const hasGroom =
    groom.eventTitle || groom.date || groom.time || groom.location || groom.address || normalizeEmbed(groom.mapEmbed)

  if (!hasBride && !hasGroom) return null

  return (
    <section className="bg-gradient-to-br from-[#fff8ef] via-[#fff3e3] to-[#fde9f4] py-12 px-4 md:py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.26em] text-[#b17b4c]">Lịch trình</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4a3326]">Nhà gái &amp; Nhà trai</h2>
          <p className="text-sm text-[#7b5e4b]">Thông tin thời gian, địa điểm và bản đồ di chuyển.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <EventCard
            label="Nhà gái"
            highlight={bride.eventTitle || 'Lễ Vu Quy'}
            event={bride}
            accent="text-[#c58645]"
          />
          <EventCard
            label="Nhà trai"
            highlight={groom.eventTitle || 'Lễ Thành Hôn'}
            event={groom}
            accent="text-[#b172c4]"
          />
        </div>
      </div>
    </section>
  )
}
