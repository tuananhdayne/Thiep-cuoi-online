import Reveal from './Reveal'

export type WeddingInfoProps = {
  date?: string | null
  time?: string | null
  location?: string | null
  address?: string | null
  mapLink?: string | null
}

const formatDate = (value?: string | null) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(value))
}

const formatTime = (value?: string | null) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(`1970-01-01T${value}+07:00`))
}

export default function WeddingInfo({ date, time, location, address, mapLink }: WeddingInfoProps) {
  return (
    <section className="py-16 px-6" id="wedding-info">
      <div className="max-w-5xl mx-auto">
        <Reveal className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.32em] text-[#c08a4b]">Thông tin lễ cưới</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#5b3a29]">Save the Date</h2>
            <p className="text-sm text-[#7b5e4b]">Hẹn gặp bạn trong ngày trọng đại của chúng tôi.</p>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-[28px] shadow-[0_30px_60px_rgba(91,58,41,0.08)] border border-amber-50 p-6 md:p-8 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#5b3a29]">
                <span className="text-lg">📅</span>
                <div>
                  <p className="text-sm text-[#7b5e4b]">Ngày cưới</p>
                  <p className="font-semibold text-lg">{formatDate(date) || 'Đang cập nhật'}</p>
                  {time && <p className="text-sm text-[#7b5e4b]">{formatTime(time)}</p>}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-[#5b3a29]">
                <span className="text-lg">📍</span>
                <div>
                  <p className="text-sm text-[#7b5e4b]">Địa điểm</p>
                  <p className="font-semibold text-lg">{location || 'Đang cập nhật'}</p>
                  {address && <p className="text-sm text-[#7b5e4b] mt-1">{address}</p>}
                  {mapLink && (
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-white bg-gradient-to-r from-[#c08a4b] to-[#e6b877] px-4 py-2 rounded-full shadow-md transition hover:scale-[1.02] hover:shadow-lg"
                    >
                      Xem bản đồ
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
