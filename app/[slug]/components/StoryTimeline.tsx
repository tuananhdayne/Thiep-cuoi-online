import Reveal from './Reveal'

type TimelineItem = {
  title: string
  date: string
  description: string
  image?: string
}

type StoryTimelineProps = {
  items: TimelineItem[]
}

export default function StoryTimeline({ items }: StoryTimelineProps) {
  if (!items || !items.length) return null

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-[#fffaf3] to-[#f8f4ef]" id="story">
      <div className="max-w-5xl mx-auto space-y-8">
        <Reveal className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-[#c08a4b]">Câu chuyện tình yêu</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#5b3a29]">Hành trình bên nhau</h2>
          <p className="text-sm text-[#7b5e4b]">Những khoảnh khắc đáng nhớ của chúng tôi.</p>
        </Reveal>

        <div className="relative border-l border-amber-100 ml-6 space-y-8">
          {items.map((item, idx) => (
            <Reveal key={item.title + idx} className="relative pl-6">
              <span className="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#c08a4b] to-[#e6b877] shadow-lg" />
              <div className="bg-white rounded-2xl border border-amber-50 shadow-[0_20px_40px_rgba(91,58,41,0.06)] p-5 flex flex-col md:flex-row gap-4">
                {item.image && (
                  <div className="md:w-40 h-28 rounded-xl overflow-hidden shadow-sm">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c08a4b]">{item.date}</p>
                  <h3 className="text-xl font-semibold text-[#5b3a29]">{item.title}</h3>
                  <p className="text-sm text-[#7b5e4b] leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
