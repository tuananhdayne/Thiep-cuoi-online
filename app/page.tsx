import Link from 'next/link'
import Image from 'next/image'
import PetalEffect from './[slug]/components/PetalEffect'
import AutoScrollTemplatePreview from './components/AutoScrollTemplatePreview'
import TemplateCatalog from './components/TemplateCatalog'

const features = [
  {
    number: '01',
    title: 'Thiết kế có gu',
    text: '21+ phong cách được chăm chút tỉ mỉ cho từng không khí lễ cưới.',
  },
  {
    number: '02',
    title: 'Tạo trong vài phút',
    text: 'Nhập thông tin, tải ảnh và xem trước tức thì trước khi xuất bản.',
  },
  {
    number: '03',
    title: 'Đầy đủ tiện ích',
    text: 'Mở phong bì 3D, album ảnh, bản đồ dẫn đường, RSVP, lời chúc và hộp mừng cưới mừng tân hôn.',
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

            <h1 className="font-display text-[3.5rem] leading-[1.02] tracking-[-0.02em] text-[#40291f] sm:text-7xl lg:text-[5.65rem]">
              Một tấm thiệp,
              <span className="mt-2 block font-normal italic tracking-[0.005em] text-[#ad7547]">vạn lời yêu thương.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#735b4d] md:text-lg">
              Tạo thiệp cưới trực tuyến mang dấu ấn riêng với hiệu ứng mở phong bì 3D, cánh hoa bay bồng bềnh, âm nhạc lãng mạn và tối ưu hoàn hảo trên mọi thiết bị.
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
                Khám phá 21+ mẫu thiệp
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-9 gap-y-4 border-t border-[#775541]/10 pt-7">
              <div>
                <p className="font-display text-2xl text-[#4b3024]">21+</p>
                <p className="text-xs text-[#8c7161]">Mẫu thiệp đa phong cách</p>
              </div>
              <div>
                <p className="font-display text-2xl text-[#4b3024]">10</p>
                <p className="text-xs text-[#8c7161]">Mẫu phong bì 3D hot</p>
              </div>
              <div>
                <p className="font-display text-2xl text-[#4b3024]">100%</p>
                <p className="text-xs text-[#8c7161]">Tối ưu di động & Chia sẻ tức thì</p>
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
              <AutoScrollTemplatePreview
                src="/demo?theme=burgundy-romance&embedded=1"
                title="Thiệp cưới mẫu nổi bật"
                autoScroll={true}
              />
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
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ad7547]">Bộ sưu tập giao diện</p>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-[-0.03em] text-[#40291f] md:text-6xl">
                Chọn phong cách
                <span className="block italic text-[#ad7547]">kể câu chuyện của bạn.</span>
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-2xl text-sm leading-7 text-[#7b6253] md:text-base">
                Mỗi mẫu là một thế giới cảm xúc riêng. Lọc theo phong cách bạn yêu thích, di chuột để xem thiệp tự động cuộn hoặc bấm <strong>Xem nhanh</strong> để trải nghiệm trực tiếp trên điện thoại ảo.
              </p>
            </div>
          </div>

          {/* Interactive Template Catalog with Category Tabs, Quick View Modal, and Smooth Previews */}
          <TemplateCatalog />
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
              href="https://zalo.me/0867899875"
              target="_blank"
              rel="noopener noreferrer"
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
