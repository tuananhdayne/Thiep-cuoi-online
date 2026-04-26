import Link from 'next/link'
import PetalEffect from './[slug]/components/PetalEffect'
import { getThemeDisplayName } from './[slug]/templates/templateLoader'
import AutoScrollTemplatePreview from './components/AutoScrollTemplatePreview'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#5b3a29] font-sans selection:bg-[#c08a4b]/30">
      <PetalEffect />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-[#c08a4b]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-bl from-[#e6b877]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-[#c08a4b] font-semibold">
            Nền Tảng Tạo Thiệp Cưới Trực Tuyến
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#5b3a29] leading-[1.1]">
            Lưu Giữ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c08a4b] to-[#e6b877] italic pr-2">Khoảnh Khắc</span>
            <br /> Trọn Vẹn
          </h1>
          <p className="text-lg md:text-xl text-[#7b5e4b] max-w-2xl mx-auto leading-relaxed">
            Tạo thiệp cưới điện tử mang đậm dấu ấn cá nhân của bạn chỉ trong vài phút.
            Gửi gắm yêu thương, nhận lời chúc phúc và quản lý khách mời dễ dàng.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/create"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c08a4b] to-[#e6b877] text-white rounded-full font-medium hover:shadow-[0_8px_30px_rgba(192,138,75,0.4)] transition-all hover:-translate-y-1"
            >
              Tạo Thiệp Ngay
            </Link>
            <a
              href="#templates"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#5b3a29] rounded-full font-medium border border-amber-100 hover:border-[#c08a4b] hover:bg-[#fffaf3] transition-all"
            >
              Xem Mẫu Giao Diện
            </a>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-display text-4xl md:text-5xl text-[#5b3a29]">Bộ Sưu Tập Giao Diện</h2>
            <p className="text-[#7b5e4b] max-w-xl mx-auto">
              Lựa chọn từ các phong cách thiết kế độc đáo và tinh tế, được tùy chỉnh để phù hợp với câu chuyện tình yêu của riêng bạn.
            </p>
            <p className="text-sm uppercase tracking-[0.2em] text-[#c08a4b]">Live Demo Tu Dong Cuon Toan Trang</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Template 1: Classic */}
            <div className="group rounded-[36px] bg-[#fffaf3] border border-amber-100 overflow-hidden transition-all hover:shadow-[0_24px_70px_rgba(91,58,41,0.14)] relative flex flex-col h-full">
              <div className="relative h-[620px] w-full bg-gradient-to-b from-[#fffaf3] to-[#f8efe2] flex items-center justify-center">
                <div className="w-[280px] sm:w-[300px] h-[560px] rounded-[36px] border-[7px] border-[#5b3a29]/15 bg-black/5 shadow-[0_16px_40px_rgba(91,58,41,0.2)] overflow-hidden">
                  <AutoScrollTemplatePreview src="/demo?theme=classic&embedded=1" title="Cổ Điển Hoàng Kim preview" />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1.5 bg-[#5b3a29]/10 backdrop-blur-md rounded-full text-[#5b3a29] text-[11px] font-semibold tracking-wider">{getThemeDisplayName('classic')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display text-[#5b3a29] mb-3">{getThemeDisplayName('classic')}</h3>
                <p className="text-sm text-[#7b5e4b] mb-8 flex-1">Nâu và Vàng truyền thống. Bố cục dọc chuẩn mực mang đến sự ấm áp, sang trọng và thanh lịch tuyệt đối.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=classic"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#5b3a29] border border-amber-200 rounded-full font-medium hover:bg-[#fffaf3] hover:border-[#c08a4b] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=classic"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#5b3a29] to-[#c08a4b] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 2: Heritage */}
            <div className="group rounded-[36px] bg-[#eef6f2] border border-[#cde3dd] overflow-hidden transition-all hover:shadow-[0_24px_70px_rgba(23,74,67,0.14)] relative flex flex-col h-full">
              <div className="relative h-[620px] w-full bg-gradient-to-b from-[#eef6f2] to-[#dbeee8] flex items-center justify-center">
                <div className="w-[280px] sm:w-[300px] h-[560px] rounded-[36px] border-[7px] border-[#174a43]/15 bg-black/5 shadow-[0_16px_40px_rgba(23,74,67,0.18)] overflow-hidden">
                  <AutoScrollTemplatePreview src="/demo?theme=heritage&embedded=1" title="Hỷ Sắc Cổ Truyền preview" />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1.5 bg-[#174a43]/10 backdrop-blur-md rounded-full text-[#174a43] text-[11px] font-semibold tracking-wider">{getThemeDisplayName('heritage')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#eef6f2]">
                <h3 className="text-2xl font-display text-[#174a43] mb-3">{getThemeDisplayName('heritage')}</h3>
                <p className="text-sm text-[#3f6b64] mb-8 flex-1">Tông ngọc cổ trang nhã, hoa văn truyền thống và bố cục trang trọng, đậm chất thiệp cưới Việt Nam.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=heritage"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#174a43] border border-[#cde3dd] rounded-full font-medium hover:bg-[#eaf5f1] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=heritage"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#0f766e] to-[#2a9d8f] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 3: Midnight */}
            <div className="group rounded-[36px] bg-[#0f1720] border border-white/10 overflow-hidden transition-all hover:shadow-[0_24px_70px_rgba(0,0,0,0.45)] relative flex flex-col h-full">
              <div className="relative h-[620px] w-full bg-gradient-to-b from-[#0f1720] to-[#1f2a36] flex items-center justify-center">
                <div className="w-[280px] sm:w-[300px] h-[560px] rounded-[36px] border-[7px] border-[#d4af7a]/25 bg-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] overflow-hidden">
                  <AutoScrollTemplatePreview src="/demo?theme=midnight&embedded=1" title="Dạ Tiệc Ánh Kim preview" />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[#f5efe6] text-[11px] font-semibold tracking-wider">{getThemeDisplayName('midnight')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#0f1720]">
                <h3 className="text-2xl font-display text-[#f5efe6] mb-3">{getThemeDisplayName('midnight')}</h3>
                <p className="text-sm text-[#d4c6b4] mb-8 flex-1">Nền tối, viền vàng mảnh và cảm giác điện ảnh. Phù hợp với thiệp cưới sang trọng, khác biệt.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=midnight"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#0f1720] border border-white/20 rounded-full font-medium hover:bg-[#f5efe6] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=midnight"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#d4af7a] to-[#8c6f5a] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 4: Elegance */}
            <div className="group rounded-[36px] bg-[#f8f6f1] border border-[#d4c5a9]/30 overflow-hidden transition-all hover:shadow-[0_24px_70px_rgba(45,42,38,0.12)] relative flex flex-col h-full">
              <div className="relative h-[620px] w-full bg-gradient-to-b from-[#f8f6f1] to-[#efe7da] flex items-center justify-center">
                <div className="w-[280px] sm:w-[300px] h-[560px] rounded-[36px] border-[7px] border-[#b39a6a]/20 bg-black/5 shadow-[0_16px_40px_rgba(45,42,38,0.16)] overflow-hidden">
                  <AutoScrollTemplatePreview src="/demo?theme=elegance&embedded=1" title="Thanh Lịch Tân Cổ Điển preview" />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1.5 bg-[#2d2a26]/10 backdrop-blur-md rounded-full text-[#2d2a26] text-[11px] font-semibold tracking-wider">{getThemeDisplayName('elegance')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#f8f6f1]">
                <h3 className="text-2xl font-display text-[#2d2a26] mb-3">{getThemeDisplayName('elegance')}</h3>
                <p className="text-sm text-[#4a453d] mb-8 flex-1">Tối giản kết hợp tân cổ điển. Nền ngà, viền vàng đồng, typography thanh lịch — thiết kế mobile-first cuộn dọc sang trọng.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=elegance"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#2d2a26] border border-[#d4c5a9]/40 rounded-full font-medium hover:bg-[#faf8f4] hover:border-[#b39a6a] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=elegance"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#b39a6a] to-[#d4c5a9] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 5: Romance */}
            <div className="group rounded-[36px] bg-[#1a1120] border border-rose-500/20 overflow-hidden transition-all hover:shadow-[0_24px_70px_rgba(244,63,94,0.2)] relative flex flex-col h-full">
              <div className="relative h-[620px] w-full bg-gradient-to-b from-[#1a1120] to-[#2b1836] flex items-center justify-center">
                <div className="w-[280px] sm:w-[300px] h-[560px] rounded-[36px] border-[7px] border-rose-400/20 bg-black/10 shadow-[0_16px_40px_rgba(244,63,94,0.25)] overflow-hidden">
                  <AutoScrollTemplatePreview src="/demo?theme=romance&embedded=1" title="Đêm Lãng Mạn Glassmorphism preview" />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1.5 bg-rose-500/20 backdrop-blur-md rounded-full text-rose-200 border border-rose-400/30 text-[11px] font-semibold tracking-wider">{getThemeDisplayName('romance')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#1a1120]">
                <h3 className="text-2xl font-display text-rose-300 mb-3">{getThemeDisplayName('romance')}</h3>
                <p className="text-sm text-rose-200/70 mb-8 flex-1">Dark mode huyền bí với hiệu ứng Kính mờ (Glassmorphism), hạt sáng li ti lơ lửng và chuyển động Framer Motion siêu mượt mà.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=romance"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white/5 text-rose-200 border border-rose-500/30 rounded-full font-medium hover:bg-white/10 transition-all text-sm backdrop-blur-md"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=romance"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-full font-medium hover:shadow-lg hover:shadow-rose-500/25 transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 6: Minimalist Typography */}
            <div className="group rounded-[36px] bg-[#FDFBF7] border border-gray-200 overflow-hidden transition-all hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)] relative flex flex-col h-full">
              <div className="relative h-[620px] w-full bg-gradient-to-b from-[#FDFBF7] to-[#f2eee8] flex items-center justify-center border-b border-gray-200">
                <div className="w-[280px] sm:w-[300px] h-[560px] rounded-[36px] border-[7px] border-gray-300/60 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] overflow-hidden">
                  <AutoScrollTemplatePreview src="/demo?theme=minimalist&embedded=1" title="Tối Giản Tân Cổ Điển preview" />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full text-gray-800 border border-gray-300 text-[11px] font-semibold tracking-wider">{getThemeDisplayName('minimalist')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#FDFBF7]">
                <h3 className="text-2xl font-display text-gray-900 mb-3">{getThemeDisplayName('minimalist')}</h3>
                <p className="text-sm text-gray-600 mb-8 flex-1">Phong cách Tân Cổ Điển Tối Giản. Phân cấp Typography tinh tế với các font chữ ký bay bổng, Serif sang trọng và căn giữa hoàn toàn.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=minimalist"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-gray-800 border border-gray-300 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=minimalist"
                    className="flex-1 text-center py-3.5 px-4 bg-[#2D3748] text-white rounded-full font-medium hover:shadow-lg hover:bg-[#1A202C] transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-[#7b5e4b] bg-white border-t border-amber-50">
        <p>&copy; {new Date().getFullYear()} Thiệp Cưới Trực Tuyến. All rights reserved.</p>
      </footer>
    </main>
  )
}
