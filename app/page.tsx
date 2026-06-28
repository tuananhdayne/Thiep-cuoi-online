import Link from 'next/link'
import Image from 'next/image'
import PetalEffect from './[slug]/components/PetalEffect'
import AutoScrollTemplatePreview from './components/AutoScrollTemplatePreview'
import { getThemeDisplayName, type SupportedTheme } from './[slug]/templates/templateLoader'

type TemplateCard = {
  theme: SupportedTheme
  eyebrow: string
  description: string
  palette: string
  frame: string
  badge: string
  button: string
  featured?: boolean
}

const templates: TemplateCard[] = [
  {
    theme: 'classic',
    eyebrow: 'Ấm áp · Trang trọng',
    description: 'Sắc nâu và vàng cổ điển, dành cho một lễ cưới trang trọng nhưng vẫn gần gũi.',
    palette: 'from-[#f8ecdc] via-[#fffaf3] to-[#ead2b5]',
    frame: 'border-[#6b4632]/20 shadow-[0_24px_55px_rgba(91,58,41,0.2)]',
    badge: 'bg-white/80 text-[#654430] border-[#8f6246]/15',
    button: 'from-[#6b4632] to-[#b77d47]',
  },
  {
    theme: 'heritage',
    eyebrow: 'Tinh hoa Việt · Thanh nhã',
    description: 'Hoa văn truyền thống trên nền ngọc trầm, cân bằng giữa nét Việt và thẩm mỹ hiện đại.',
    palette: 'from-[#dcece7] via-[#f2f8f5] to-[#c7ddd5]',
    frame: 'border-[#174a43]/20 shadow-[0_24px_55px_rgba(23,74,67,0.2)]',
    badge: 'bg-white/80 text-[#174a43] border-[#174a43]/15',
    button: 'from-[#174a43] to-[#2a8b7e]',
  },
  {
    theme: 'midnight',
    eyebrow: 'Điện ảnh · Sang trọng',
    description: 'Nền đêm sâu cùng ánh kim tinh tế, phù hợp với tiệc tối và không gian cao cấp.',
    palette: 'from-[#121b26] via-[#1c2937] to-[#0a1017]',
    frame: 'border-[#d4af7a]/25 shadow-[0_24px_60px_rgba(0,0,0,0.45)]',
    badge: 'bg-white/10 text-[#f5e8d2] border-white/10',
    button: 'from-[#b98c52] to-[#e0bd83]',
  },
  {
    theme: 'elegance',
    eyebrow: 'Tân cổ điển · Tinh tế',
    description: 'Nhiều khoảng thở, typography thanh lịch và những đường viền vàng đồng nhẹ nhàng.',
    palette: 'from-[#eee9df] via-[#faf8f4] to-[#ddd3c1]',
    frame: 'border-[#b39a6a]/20 shadow-[0_24px_55px_rgba(45,42,38,0.17)]',
    badge: 'bg-white/80 text-[#3b3731] border-[#b39a6a]/20',
    button: 'from-[#75654a] to-[#b39a6a]',
  },
  {
    theme: 'luxury',
    eyebrow: 'Hỷ sắc · Quyền quý',
    description: 'Đỏ đô và vàng kim tạo nên không khí hỷ sự truyền thống, nổi bật và đầy trang trọng.',
    palette: 'from-[#8f2028] via-[#b7373f] to-[#f0cda0]',
    frame: 'border-[#f5d79b]/45 shadow-[0_24px_60px_rgba(112,25,31,0.28)]',
    badge: 'bg-[#fff5dc]/90 text-[#8b2229] border-[#f1d39a]/60',
    button: 'from-[#a62932] to-[#d7a447]',
  },
  {
    theme: 'romance',
    eyebrow: 'Lãng mạn · Huyền ảo',
    description: 'Glassmorphism, sắc hồng đêm và hiệu ứng ánh sáng cho một câu chuyện tình đầy cảm xúc.',
    palette: 'from-[#160e1c] via-[#2c1737] to-[#120a18]',
    frame: 'border-rose-300/20 shadow-[0_24px_60px_rgba(190,60,110,0.3)]',
    badge: 'bg-rose-300/10 text-rose-100 border-rose-200/15',
    button: 'from-[#a83f69] to-[#e06f93]',
  },
  {
    theme: 'minimalist',
    eyebrow: 'Tối giản · Thời thượng',
    description: 'Bố cục sạch, chữ đẹp và đường nét chuẩn mực để mọi thông tin luôn dễ đọc và nổi bật.',
    palette: 'from-[#e8e5de] via-[#fdfbf7] to-[#d9d5cc]',
    frame: 'border-black/10 shadow-[0_24px_55px_rgba(0,0,0,0.14)]',
    badge: 'bg-white/80 text-[#2d3748] border-black/10',
    button: 'from-[#26313e] to-[#596777]',
  },
  {
    theme: 'pastel',
    eyebrow: 'Hàn Quốc · Nhẹ nhàng',
    description: 'Sage, nude và watercolor mềm mại cho một tấm thiệp trong trẻo, trẻ trung và giàu cảm xúc.',
    palette: 'from-[#e3eeea] via-[#fbf8f3] to-[#eddcdd]',
    frame: 'border-[#8ca89f]/20 shadow-[0_24px_55px_rgba(107,122,118,0.18)]',
    badge: 'bg-white/80 text-[#60736e] border-[#8ca89f]/20',
    button: 'from-[#78978f] to-[#a8c3bc]',
  },
  {
    theme: 'viet-silk',
    eyebrow: 'Gấm Việt · Hoa sen',
    description: 'Đỏ son, kem lụa và vàng đồng kết hợp hoa sen, mây cổ và tinh thần thiệp hỷ Việt Nam.',
    palette: 'from-[#f0d7b0] via-[#fff4df] to-[#a92f35]',
    frame: 'border-[#e2bd78]/50 shadow-[0_24px_60px_rgba(111,35,37,0.28)]',
    badge: 'bg-[#fff5df]/90 text-[#7d1f25] border-[#d7ad69]/50',
    button: 'from-[#7d1f25] to-[#b78449]',
  },
  {
    theme: 'botanical',
    eyebrow: 'Garden wedding · Lãng mạn',
    description: 'Khu vườn châu Âu với eucalyptus, olive, hoa trắng và bảng màu sage dịu nhẹ, thanh lịch.',
    palette: 'from-[#dce4d5] via-[#f8f4e9] to-[#d9c8b4]',
    frame: 'border-[#cbd5c2]/60 shadow-[0_24px_60px_rgba(74,86,65,0.22)]',
    badge: 'bg-[#fffdf7]/90 text-[#4d5a45] border-[#aab8a0]/45',
    button: 'from-[#647258] to-[#a8976d]',
  },
  {
    theme: 'midnight-elegance',
    eyebrow: 'Ballroom · Champagne glow',
    description: 'Dạ tiệc cưới buổi tối với navy sâu, đen than, ánh pha lê và vàng champagne sang trọng.',
    palette: 'from-[#070b12] via-[#0f172a] to-[#d4af7f]',
    frame: 'border-[#d4af7f]/30 shadow-[0_24px_70px_rgba(0,0,0,0.45)]',
    badge: 'bg-[#111827]/80 text-[#f8f8f2] border-[#d4af7f]/30',
    button: 'from-[#111827] to-[#d4af7f]',
  },
]

const features = [
  {
    number: '01',
    title: 'Thiết kế có gu',
    text: 'Nhiều phong cách được chăm chút cho từng không khí lễ cưới.',
  },
  {
    number: '02',
    title: 'Tạo trong vài phút',
    text: 'Nhập thông tin, tải ảnh và xem trước ngay trước khi xuất bản.',
  },
  {
    number: '03',
    title: 'Đủ tiện ích',
    text: 'Album ảnh, bản đồ, RSVP, lời chúc và hộp mừng cưới trong một nơi.',
  },
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M14 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f3ec] text-[#3c2921] selection:bg-[#bd8754]/25">
      <PetalEffect />

      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#ad7748]/25 bg-white/70 font-display text-xl italic text-[#8b5a35] shadow-sm backdrop-blur-md">
              W
            </span>
            <span>
              <span className="block font-display text-lg leading-none text-[#4b3024]">Wedding Story</span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.32em] text-[#a17b63]">Thiệp cưới trực tuyến</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[#745848] md:flex">
            <a href="#features" className="transition hover:text-[#a46d3e]">Tiện ích</a>
            <a href="#templates" className="transition hover:text-[#a46d3e]">Giao diện</a>
            <Link
              href="/create"
              className="rounded-full bg-[#513426] px-5 py-2.5 font-semibold text-white shadow-[0_10px_30px_rgba(81,52,38,0.16)] transition hover:-translate-y-0.5 hover:bg-[#684531]"
            >
              Tạo thiệp
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative min-h-[880px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[#e8cdb1]/45 blur-3xl" />
          <div className="absolute bottom-0 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#d9c6bb]/40 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#5b3a29_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#9f7049]/15 bg-white/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a6a43] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#bd8754]" />
              Nơi câu chuyện tình yêu bắt đầu
            </div>

            <h1 className="font-display text-[3.5rem] leading-[0.98] tracking-[-0.045em] text-[#40291f] sm:text-7xl lg:text-[5.65rem]">
              Một tấm thiệp,
              <span className="mt-2 block font-normal italic text-[#ad7547]">vạn lời yêu thương.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#735b4d] md:text-lg">
              Tạo thiệp cưới trực tuyến mang dấu ấn riêng, đẹp trên mọi thiết bị và sẵn sàng chia sẻ đến những người bạn yêu quý.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#513426] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(81,52,38,0.2)] transition hover:-translate-y-1 hover:bg-[#684531]"
              >
                Bắt đầu tạo thiệp
                <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-full border border-[#7d5d49]/20 bg-white/65 px-7 py-4 text-sm font-semibold text-[#5b4032] backdrop-blur-md transition hover:border-[#ad7547]/50 hover:bg-white"
              >
                Khám phá bộ sưu tập
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-9 gap-y-4 border-t border-[#775541]/10 pt-7">
              <div>
                <p className="font-display text-2xl text-[#4b3024]">11</p>
                <p className="text-xs text-[#8c7161]">Giao diện cao cấp</p>
              </div>
              <div>
                <p className="font-display text-2xl text-[#4b3024]">100%</p>
                <p className="text-xs text-[#8c7161]">Tối ưu di động</p>
              </div>
              <div>
                <p className="font-display text-2xl text-[#4b3024]">5 phút</p>
                <p className="text-xs text-[#8c7161]">Để có thiệp đầu tiên</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[610px] w-full max-w-[590px]">
            <div className="absolute left-0 top-12 h-[455px] w-[72%] rotate-[-7deg] overflow-hidden rounded-[36px] border-[10px] border-white bg-white shadow-[0_35px_90px_rgba(74,45,31,0.18)]">
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=88"
                alt="Cặp đôi trong ngày cưới"
                fill
                sizes="(max-width: 1024px) 70vw, 420px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#342016]/45 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 text-white">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/75">Save the date</p>
                <p className="mt-2 font-display text-3xl italic">Ngọc Lan & Minh Khang</p>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 h-[480px] w-[58%] rotate-[5deg] overflow-hidden rounded-[38px] border-[10px] border-[#1e1915] bg-white shadow-[0_35px_90px_rgba(0,0,0,0.3)] relative">
              {/* Phone Notch */}
              <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-16 h-3.5 bg-[#1e1915] rounded-full z-20 pointer-events-none" />
              <AutoScrollTemplatePreview src="/demo?theme=pastel&embedded=1" title="Thiệp cưới mẫu nổi bật" />
            </div>

            <div className="absolute right-3 top-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_16px_40px_rgba(74,45,31,0.12)] backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#a17b63]">Live preview</p>
              <p className="mt-1 text-sm font-semibold text-[#513426]">Xem trước tức thì</p>
            </div>

            <div className="absolute bottom-10 left-4 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_16px_40px_rgba(74,45,31,0.12)] backdrop-blur-xl">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#edf3ef] text-[#718c83]">✓</span>
              <div>
                <p className="text-sm font-semibold text-[#513426]">Sẵn sàng chia sẻ</p>
                <p className="text-[10px] text-[#967a69]">Mọi thiết bị · Mọi khoảnh khắc</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative border-y border-[#684631]/10 bg-[#4b3024] px-5 py-10 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:gap-0">
          {features.map((feature, index) => (
            <div
              key={feature.number}
              className={`flex gap-5 px-2 md:px-9 ${index > 0 ? 'md:border-l md:border-white/10' : ''}`}
            >
              <span className="font-display text-3xl italic text-[#d2a572]">{feature.number}</span>
              <div>
                <h2 className="font-display text-xl">{feature.title}</h2>
                <p className="mt-1.5 text-xs leading-6 text-white/60">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="templates" className="relative bg-[#fffdf9] px-5 py-24 md:px-8 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f8f3ec] to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ad7547]">Bộ sưu tập giao diện</p>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-[-0.03em] text-[#40291f] md:text-6xl">
                Chọn phong cách
                <span className="block italic text-[#ad7547]">kể câu chuyện của bạn.</span>
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-2xl text-sm leading-7 text-[#7b6253] md:text-base">
                Mỗi mẫu là một không khí riêng. Di chuột vào bản xem trước để khám phá toàn bộ thiệp, hoặc mở bản đầy đủ trước khi bắt đầu chỉnh sửa.
              </p>
              <div className="mt-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a7a64]">
                <span className="h-px w-10 bg-[#bd8754]" />
                Preview tự động cuộn
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2">
            {templates.map((template, index) => (
              <article
                key={template.theme}
                className={`group overflow-hidden rounded-[32px] border border-[#5c3b28]/10 bg-white shadow-[0_14px_50px_rgba(76,50,36,0.07)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(76,50,36,0.14)] ${
                  template.featured ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`grid ${template.featured ? 'lg:grid-cols-[0.8fr_1.2fr]' : ''}`}>
                  <div className={`relative flex min-h-[560px] items-center justify-center overflow-hidden bg-gradient-to-br ${template.palette} px-6 py-12`}>
                    <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#3c2921_0.7px,transparent_0.7px)] [background-size:16px_16px]" />
                    <span className={`absolute left-5 top-5 z-10 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md ${template.badge}`}>
                      {String(index + 1).padStart(2, '0')} · {getThemeDisplayName(template.theme)}
                    </span>
                    <div className={`relative h-[500px] w-[260px] overflow-hidden rounded-[34px] border-[9px] border-[#1e1915] bg-[#1e1915] transition duration-500 group-hover:scale-[1.025] shadow-xl`}>
                      {/* Phone Notch */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-14 h-3 bg-[#1e1915] rounded-full z-20 pointer-events-none" />
                      <AutoScrollTemplatePreview
                        src={`/demo?theme=${template.theme}&embedded=1`}
                        title={`${getThemeDisplayName(template.theme)} preview`}
                      />
                    </div>
                  </div>

                  <div className={`flex flex-col justify-between p-7 md:p-9 ${template.featured ? 'lg:p-12' : ''}`}>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ae8060]">{template.eyebrow}</p>
                      <h3 className="mt-3 font-display text-3xl tracking-[-0.02em] text-[#40291f]">{getThemeDisplayName(template.theme)}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#7b6253]">{template.description}</p>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <Link
                        href={`/demo?theme=${template.theme}`}
                        target="_blank"
                        className="flex-1 rounded-full border border-[#654634]/15 bg-[#faf7f2] px-4 py-3.5 text-center text-sm font-semibold text-[#604536] transition hover:border-[#ad7547]/40 hover:bg-white"
                      >
                        Xem đầy đủ
                      </Link>
                      <Link
                        href={`/create?theme=${template.theme}`}
                        className={`group/button flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg ${template.button}`}
                      >
                        Chọn mẫu <span className="transition-transform group-hover/button:translate-x-1"><ArrowIcon /></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] px-5 pb-24 md:px-8 md:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#4b3024] px-6 py-16 text-center text-white shadow-[0_30px_80px_rgba(75,48,36,0.2)] md:px-12 md:py-20">
          <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-36 -right-14 h-80 w-80 rounded-full border border-[#d2a572]/25" />
          <p className="relative text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d2a572]">Ngày vui đang đến gần</p>
          <h2 className="relative mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Biến lời mời thành một phần đẹp nhất của ngày cưới.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
            Chọn mẫu bạn yêu thích, thêm câu chuyện của riêng mình và chia sẻ chỉ bằng một đường dẫn.
          </p>
          <Link
            href="/create"
            className="relative mt-9 inline-flex items-center gap-3 rounded-full bg-[#d2a572] px-7 py-4 text-sm font-bold text-[#40291f] transition hover:-translate-y-1 hover:bg-[#e0b986]"
          >
            Tạo thiệp cưới ngay <ArrowIcon />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#684631]/10 bg-[#f8f3ec] px-5 py-9 md:px-8">
        <div className="mx-auto mb-8 max-w-7xl rounded-[28px] border border-[#d9c7b3]/70 bg-white/65 p-6 text-center shadow-[0_16px_45px_rgba(76,50,36,0.06)] backdrop-blur md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#ad7547]">Liên hệ tư vấn</p>
          <h2 className="mt-3 font-display text-3xl text-[#4b3024]">Cần hỗ trợ tạo thiệp?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#7b6253]">
            Kết nối với chúng tôi để được tư vấn mẫu thiệp, chỉnh giao diện và hỗ trợ tạo thiệp cưới online.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:0867899875"
              className="rounded-full bg-[#513426] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#684531]"
            >
              Zalo: 0867899875
            </a>
            <a
              href="https://www.facebook.com/share/1CzHvomGia/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#654634]/15 bg-white px-6 py-3 text-sm font-semibold text-[#604536] transition hover:-translate-y-0.5 hover:border-[#ad7547]/40"
            >
              Facebook
            </a>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-lg text-[#4b3024]">Wedding Story</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#9c806e]">Thiệp cưới trực tuyến</p>
          </div>
          <p className="text-xs text-[#927766]">© {new Date().getFullYear()} Wedding Story. Gửi yêu thương theo cách của bạn.</p>
        </div>
      </footer>
    </main>
  )
}
