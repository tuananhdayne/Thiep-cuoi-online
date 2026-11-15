const fs = require('fs');
const path = require('path');

const all10 = [
  {
    fileName: 'BurgundyRomanceTemplate.tsx',
    componentName: 'BurgundyRomanceTemplate',
    variant: 'burgundy',
    outerBg: 'bg-[#200508]',
    cardBg: 'bg-[#FFF7EB]',
    textMain: 'text-[#511419]',
    borderColor: 'border-[#511419]/25',
    accentColor: '#C9A24A',
    invertedBg: 'bg-[#511419]',
    invertedText: 'text-[#ECE4D8]',
    invertedCardSub: 'bg-[#380A0E]',
    topBadge: 'ĐỎ RƯỢU TỐI GIẢN',
    quote: '“Tình yêu không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng.”',
    dressCode: [
      { name: 'Đỏ Rượu', color: '#511419', border: false },
      { name: 'Vàng Kim', color: '#C9A24A', border: false },
      { name: 'Kem Ngà', color: '#ECE4D8', border: true },
      { name: 'Trắng', color: '#FFFFFF', border: true }
    ],
    bgDecor: `
        {/* Paper texture overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'url(/images/themes/minimalism-dark-red/paper.webp)', backgroundSize: '100% auto', backgroundPosition: 'top center', mixBlendMode: 'multiply', opacity: 0.5 }} />
        {/* Castle backdrop illustration */}
        <img src="/images/themes/minimalism-dark-red/castle-background.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain opacity-[0.10] left-1/2 top-[10%] w-[160%] -translate-x-1/2 -z-10" />
    `,
    heroDecor: `
        {/* Flower corner flourish strictly behind text */}
        <img src="/images/themes/minimalism-dark-red/flower2-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -top-4 -right-4 w-20 sm:w-24 object-contain drop-shadow-[2px_3px_2px_rgba(0,0,0,0.2)] rotate-[-15deg] -z-10 opacity-70 animate-floral-sway" />
    `,
    ceremonyDecor: ``,
    timelineIcons: [
      '/images/themes/minimalism-dark-red/camera.webp',
      '/images/themes/minimalism-dark-red/cake.webp',
      '/images/themes/minimalism-dark-red/cook.webp',
      '/images/themes/minimalism-dark-red/camera.webp'
    ],
    footerDecor: `
        <img src="/images/themes/minimalism-dark-red/flower2-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none mx-auto w-20 opacity-30 mt-3 animate-floral-sway-slow" />
    `
  },
  {
    fileName: 'ImperialSongHyTemplate.tsx',
    componentName: 'ImperialSongHyTemplate',
    variant: 'songhy',
    outerBg: 'bg-[#2B0000]',
    cardBg: 'bg-[#FFF9E6]',
    textMain: 'text-[#420000]',
    borderColor: 'border-[#420000]/25',
    accentColor: '#8C0000',
    invertedBg: 'bg-[#420000]',
    invertedText: 'text-[#FFF9E6]',
    invertedCardSub: 'bg-[#2F0000]',
    topBadge: 'SONG HỶ CÁT TƯỜNG',
    quote: '“Trăm năm tình viên mãn, bạc đầu nghĩa phu thê. Hân hoan ngày hỷ sự, cùng chung chén rượu nồng.”',
    dressCode: [
      { name: 'Đỏ Thẫm', color: '#8C0000', border: false },
      { name: 'Vàng Kim', color: '#FFE8A4', border: false },
      { name: 'Kem Ngà', color: '#FFF9E6', border: true },
      { name: 'Đỏ Rượu', color: '#2F0000', border: false }
    ],
    bgDecor: `
        {/* Double Happiness Watermark */}
        <img src="/images/themes/song-hy-v2-red/double-happiness-bg.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain -left-[49px] -top-[30px] h-[606px] w-[541px] opacity-[0.07] md:-left-[67px] md:-top-[41px] md:h-[824px] md:w-[736px] -z-10" />
        {/* Double Happiness Side Lantern Lights */}
        <img src="/images/themes/song-hy-v2-red/double-happiness-light.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain -right-[60px] top-[480px] h-[155px] w-[163px] opacity-15 md:-right-[80px] md:top-[600px] md:h-[211px] md:w-[222px] -z-10 animate-floral-sway" />
        <img src="/images/themes/song-hy-v2-red/double-happiness-light.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain -left-[60px] top-[480px] h-[155px] w-[163px] opacity-15 md:-left-[80px] md:top-[600px] md:h-[211px] md:w-[222px] -z-10 animate-floral-sway-slow" />
        {/* Floral corner accents strictly behind content */}
        <img src="/images/themes/song-hy-v2-red/flower1.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain h-[260px] w-[230px] opacity-20 md:h-[360px] md:w-[320px] -right-10 -top-6 -z-10 animate-floral-sway" />
        <img src="/images/themes/song-hy-v2-red/flower1.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain h-[260px] w-[230px] opacity-20 md:h-[360px] md:w-[320px] -left-10 top-[280px] -z-10 animate-floral-sway-slow" />
    `,
    heroDecor: `
        {/* Double Happiness Golden Crest */}
        <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
          <img src="/images/themes/song-hy-v2-red/double-happiness.webp" alt="Song Hỷ" aria-hidden="true" className="h-[36px] w-[38px] md:h-[48px] md:w-[50px] shrink-0 object-contain drop-shadow" />
        </div>
    `,
    ceremonyDecor: `
        {/* Chinese Panel Border Frame */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[3%] right-[3%] -z-10 border-[60px_50px] md:border-[90px_80px] -top-6 bottom-0" style={{ borderStyle: 'solid', borderColor: 'transparent', borderImageSource: 'url(/images/themes/song-hy-v2-red/panel.webp)', borderImageSlice: '270 240 fill', borderImageRepeat: 'stretch' }} />
    `,
    timelineIcons: [
      '/images/themes/song-hy-v2-red/ring.webp',
      '/images/themes/song-hy-v2-red/heart.svg',
      '/images/themes/song-hy-v2-red/toast.webp',
      '/images/themes/song-hy-v2-red/cake.webp'
    ],
    footerDecor: `
        {/* Traditional Cloud Pattern Footer */}
        <div className="relative overflow-hidden w-full h-24 -mb-12 mt-4 pointer-events-none">
          <img src="/images/themes/song-hy-v2-red/cloud-pattern.webp" alt="" aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-[140%] max-w-none object-contain opacity-40" />
        </div>
    `
  },
  {
    fileName: 'SpringGardenTemplate.tsx',
    componentName: 'SpringGardenTemplate',
    variant: 'vuonxuan',
    outerBg: 'bg-[#0E241B]',
    cardBg: 'bg-[#F8FAF6]',
    textMain: 'text-[#1B4332]',
    borderColor: 'border-[#1B4332]/25',
    accentColor: '#D4AF37',
    invertedBg: 'bg-[#1B4332]',
    invertedText: 'text-[#E8F5E9]',
    invertedCardSub: 'bg-[#133225]',
    topBadge: 'VƯỜN XUÂN TƯƠI MÁT',
    quote: '“Tình yêu đẹp như khu vườn mùa xuân, dịu dàng đơm hoa và kết trái ngọt lành theo tháng năm.”',
    dressCode: [
      { name: 'Xanh Sage', color: '#40916C', border: false },
      { name: 'Xanh Rừng', color: '#1B4332', border: false },
      { name: 'Kem Nhạt', color: '#F8FAF6', border: true },
      { name: 'Vàng Kim', color: '#D4AF37', border: false }
    ],
    bgDecor: `
        {/* Spring Garden Canopy */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-80 -z-10 w-full max-w-[850px] h-[180px] sm:h-[260px] animate-floral-sway" style={{ backgroundImage: 'url(/images/themes/nature/flower_top.webp)', backgroundSize: 'contain', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }} />
        {/* Spring Foliage Overlay */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 pointer-events-none opacity-20 -z-10 w-full max-w-[800px] h-[220px]" style={{ backgroundImage: 'url(/images/themes/nature/flower_paralax.webp)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', mixBlendMode: 'darken' }} />
    `,
    heroDecor: ``,
    ceremonyDecor: ``,
    timelineIcons: null,
    footerDecor: `
        <div className="w-full h-28 pointer-events-none rotate-180 opacity-70 -mb-8 mt-2" style={{ backgroundImage: 'url(/images/themes/nature/flower_top.webp)', backgroundSize: 'contain', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }} />
    `
  },
  {
    fileName: 'GoldenVintageTemplate.tsx',
    componentName: 'GoldenVintageTemplate',
    variant: 'vintage',
    outerBg: 'bg-[#1C130C]',
    cardBg: 'bg-[#FAF6F0]',
    textMain: 'text-[#4A3525]',
    borderColor: 'border-[#4A3525]/25',
    accentColor: '#C69255',
    invertedBg: 'bg-[#4A3525]',
    invertedText: 'text-[#F5EBE1]',
    invertedCardSub: 'bg-[#322318]',
    topBadge: 'VINTAGE HOÀNG GIA',
    quote: '“Tình yêu chân thành như nét chữ hoàng gia vượt thời gian, mãi đằm thắm và nồng nàn.”',
    dressCode: [
      { name: 'Nâu Mocha', color: '#4A3525', border: false },
      { name: 'Vàng Cổ Điển', color: '#C69255', border: false },
      { name: 'Beige Ấm', color: '#FAF6F0', border: true },
      { name: 'Trắng', color: '#FFFFFF', border: true }
    ],
    bgDecor: `
        {/* Paper texture overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'url(/images/themes/minimalism-brown/paper.webp)', backgroundSize: '100% auto', backgroundPosition: 'top center', mixBlendMode: 'multiply', opacity: 0.45 }} />
        {/* Botanical leaf and house watermark */}
        <img src="/images/themes/minimalism-brown/leaf-background.webp" alt="" aria-hidden="true" className="pointer-events-none absolute left-[-15%] top-[2%] w-[45%] max-w-none object-contain opacity-15 -z-10 animate-floral-sway" />
        <img src="/images/themes/minimalism-brown/house-background.webp" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[24%] w-[120%] max-w-none -translate-x-1/2 object-contain opacity-[0.09] mix-blend-multiply -z-10" />
    `,
    heroDecor: `
        <img src="/images/themes/minimalism-brown/flower2-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -top-4 -right-4 w-16 sm:w-22 object-contain drop-shadow-[2px_3px_2px_rgba(0,0,0,0.2)] -z-10 opacity-70 animate-floral-sway-slow" />
    `,
    ceremonyDecor: ``,
    timelineIcons: [
      '/images/themes/minimalism-brown/gate.webp',
      '/images/themes/minimalism-brown/cake.webp',
      '/images/themes/minimalism-brown/water.webp',
      '/images/themes/minimalism-brown/gate.webp'
    ],
    footerDecor: `
        <img src="/images/themes/minimalism-brown/flower2-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none mx-auto w-20 opacity-30 mt-3 -scale-x-100" />
    `
  },
  {
    fileName: 'SunsetBlushTemplate.tsx',
    componentName: 'SunsetBlushTemplate',
    variant: 'blush',
    outerBg: 'bg-[#260D13]',
    cardBg: 'bg-[#FFF5F6]',
    textMain: 'text-[#691D2E]',
    borderColor: 'border-[#691D2E]/25',
    accentColor: '#D89B77',
    invertedBg: 'bg-[#691D2E]',
    invertedText: 'text-[#FFE8EC]',
    invertedCardSub: 'bg-[#48121E]',
    topBadge: 'TƠ DUYÊN LÃNG MẠN',
    quote: '“Duyên do trời định, phận do người tạo, và hạnh phúc là khi ta cùng nhau già đi.”',
    dressCode: [
      { name: 'Hồng San Hô', color: '#E66474', border: false },
      { name: 'Hồng Bụi', color: '#DDA9B8', border: false },
      { name: 'Cam Đào', color: '#F3DFC3', border: false },
      { name: 'Trắng Kem', color: '#FFF5F6', border: true }
    ],
    bgDecor: `
        {/* Silk ribbon & delicate line flourishes */}
        <img src="/images/themes/silk-ribbon-pink/line-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-cover left-[65%] top-[-40px] h-[450px] w-[180px] opacity-30 -z-10" />
        <img src="/images/themes/silk-ribbon-pink/flower-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain right-[-20px] top-[30px] h-[280px] w-[200px] opacity-35 -z-10 animate-floral-sway" />
        <img src="/images/themes/silk-ribbon-pink/ribbon-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain -left-20 top-[400px] h-[220px] w-[600px] opacity-30 -z-10" />
    `,
    heroDecor: ``,
    ceremonyDecor: ``,
    timelineIcons: [
      '/images/themes/silk-ribbon-pink/icon-ring.webp',
      '/images/themes/silk-ribbon-pink/icon-candle.webp',
      '/images/themes/silk-ribbon-pink/icon-alcohol.webp',
      '/images/themes/silk-ribbon-pink/icon-ring.webp'
    ],
    footerDecor: `
        <div className="relative overflow-hidden w-full h-16 pointer-events-none opacity-40 -mb-8">
          <img src="/images/themes/silk-ribbon-pink/ribbon-decoration.webp" alt="" aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] max-w-none object-contain" />
        </div>
    `
  },
  {
    fileName: 'CrystalLuxuryTemplate.tsx',
    componentName: 'CrystalLuxuryTemplate',
    variant: 'crystal',
    outerBg: 'bg-[#111111]',
    cardBg: 'bg-[#FDFCF7]',
    textMain: 'text-[#1F1E1D]',
    borderColor: 'border-[#C5A059]/30',
    accentColor: '#C5A059',
    invertedBg: 'bg-[#1F1E1D]',
    invertedText: 'text-[#F7F4EB]',
    invertedCardSub: 'bg-[#141312]',
    topBadge: 'CẨM THẠCH HOÀNG KIM',
    quote: '“Tình yêu trong veo như viên pha lê quý, sáng rực rỡ và vững bền cùng tháng năm.”',
    dressCode: [
      { name: 'Vàng Hổ Phách', color: '#C5A059', border: false },
      { name: 'Đen Sang Trọng', color: '#1F1E1D', border: false },
      { name: 'Trắng Ngà', color: '#FDFCF7', border: true },
      { name: 'Champagne', color: '#F4EFE7', border: true }
    ],
    bgDecor: `
        {/* Luxury marble texture */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'url(/images/themes/marble-yellow/marble.webp)', backgroundSize: '100% auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left', opacity: 0.75 }} />
        {/* Golden leaf accents strictly in margins */}
        <img src="/images/themes/marble-yellow/leaf-2.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 h-auto max-w-none object-contain -right-12 top-[160px] w-[130px] sm:w-[170px] opacity-70 animate-floral-sway" />
        <img src="/images/themes/marble-yellow/leaf-1.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 h-auto max-w-none object-contain -left-12 top-[480px] w-[120px] sm:w-[160px] opacity-70 animate-floral-sway-slow" />
    `,
    heroDecor: ``,
    ceremonyDecor: ``,
    timelineIcons: [
      '/images/themes/marble-yellow/medallion-candle.webp',
      '/images/themes/marble-yellow/medallion-birdcage.webp',
      '/images/themes/marble-yellow/medallion-alcohol.webp',
      '/images/themes/marble-yellow/medallion-candle.webp'
    ],
    footerDecor: `
        <img src="/images/themes/marble-yellow/leaf-1.webp" alt="" aria-hidden="true" className="pointer-events-none mx-auto w-20 opacity-40 mt-3 rotate-45" />
    `
  },
  {
    fileName: 'OceanBreezeTemplate.tsx',
    componentName: 'OceanBreezeTemplate',
    variant: 'ocean',
    outerBg: 'bg-[#091626]',
    cardBg: 'bg-[#F4F7FB]',
    textMain: 'text-[#142942]',
    borderColor: 'border-[#142942]/25',
    accentColor: '#C6A664',
    invertedBg: 'bg-[#142942]',
    invertedText: 'text-[#E6F0FA]',
    invertedCardSub: 'bg-[#0D1C2E]',
    topBadge: 'BIỂN XANH LÃNG MẠN',
    quote: '“Như sóng biển muôn đời ôm bờ cát mịn, tình đôi ta mãi dạt dào và bao la.”',
    dressCode: [
      { name: 'Xanh Navy', color: '#142942', border: false },
      { name: 'Vàng Cát', color: '#C6A664', border: false },
      { name: 'Kem Cát', color: '#ECE4D8', border: true },
      { name: 'Trắng Biển', color: '#FFFFFF', border: true }
    ],
    bgDecor: `
        {/* Paper texture */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'url(/images/themes/minimalism-dark-blue/paper.webp)', backgroundSize: '500px auto', backgroundRepeat: 'repeat', mixBlendMode: 'multiply', opacity: 0.5 }} />
        {/* Castle backdrop illustration */}
        <img src="/images/themes/minimalism-dark-blue/castle-background.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain -left-[20%] top-2 w-[140%] opacity-12 -z-10" />
        <img src="/images/themes/minimalism-dark-blue/flower-background.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -left-[10%] top-0 -z-10 w-[35%] max-w-none object-contain opacity-30 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.2)] animate-floral-sway" />
    `,
    heroDecor: `
        <img src="/images/themes/minimalism-dark-blue/goldenline2-decoration.webp" alt="" aria-hidden="true" className="mx-auto my-3 block w-[90px] object-contain drop-shadow relative z-10" />
    `,
    ceremonyDecor: ``,
    timelineIcons: [
      '/images/themes/minimalism-dark-blue/church.webp',
      '/images/themes/minimalism-dark-blue/cake.webp',
      '/images/themes/minimalism-dark-blue/cook.webp',
      '/images/themes/minimalism-dark-blue/church.webp'
    ],
    footerDecor: `
        <img src="/images/themes/minimalism-dark-blue/goldenline3-decoration.webp" alt="" aria-hidden="true" className="mx-auto block w-[50px] object-contain opacity-50 mt-3" />
    `
  },
  {
    fileName: 'LavenderDreamTemplate.tsx',
    componentName: 'LavenderDreamTemplate',
    variant: 'lavender',
    outerBg: 'bg-[#1B0F24]',
    cardBg: 'bg-[#FAF6FD]',
    textMain: 'text-[#3D1B50]',
    borderColor: 'border-[#3D1B50]/25',
    accentColor: '#D4AF37',
    invertedBg: 'bg-[#3D1B50]',
    invertedText: 'text-[#F2E8FA]',
    invertedCardSub: 'bg-[#281136]',
    topBadge: 'OẢI HƯƠNG MỘNG MƠ',
    quote: '“Hoa oải hương đại diện cho sự thủy chung son sắt và tình yêu dịu dàng bất tận.”',
    dressCode: [
      { name: 'Tím Oải Hương', color: '#7869A0', border: false },
      { name: 'Tím Pastel', color: '#C4B5DD', border: false },
      { name: 'Trắng Sữa', color: '#FAF6FD', border: true },
      { name: 'Vàng Kim', color: '#D4AF37', border: false }
    ],
    bgDecor: `
        {/* Purple Paper texture */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'url(/images/themes/minimalism-purple/paper.webp)', backgroundSize: '100% auto', backgroundPosition: 'top center', mixBlendMode: 'multiply', opacity: 0.5 }} />
        {/* Estate illustration watermark */}
        <img src="/images/themes/minimalism-purple/flower-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 left-[5%] top-[2%] w-[80%] max-w-none object-contain opacity-[0.05]" />
        <img src="/images/themes/minimalism-purple/house-background.webp" alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain opacity-12 -z-10 left-0 top-[35%] w-[110%]" />
    `,
    heroDecor: `
        <img src="/images/themes/minimalism-purple/flower1-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -top-4 -right-4 w-16 sm:w-22 object-contain -z-10 opacity-60 animate-floral-sway" />
    `,
    ceremonyDecor: ``,
    timelineIcons: [
      '/images/themes/minimalism-purple/church.webp',
      '/images/themes/minimalism-purple/cake.webp',
      '/images/themes/minimalism-purple/music.webp',
      '/images/themes/minimalism-purple/church.webp'
    ],
    footerDecor: `
        <div className="w-full relative h-20 -mb-10 overflow-hidden pointer-events-none">
          <img src="/images/themes/minimalism-purple/flowerbottom-decoration.webp" alt="" aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] object-contain opacity-60" />
        </div>
    `
  },
  {
    fileName: 'NoirPrestigeTemplate.tsx',
    componentName: 'NoirPrestigeTemplate',
    variant: 'noir',
    outerBg: 'bg-[#0D0204]',
    cardBg: 'bg-[#1A0407]',
    textMain: 'text-[#F7E5C8]',
    borderColor: 'border-[#FFDFAF]/30',
    accentColor: '#E5C378',
    invertedBg: 'bg-[#120204]',
    invertedText: 'text-[#F7E5C8]',
    invertedCardSub: 'bg-[#24060B]',
    topBadge: 'BAROQUE THƯỢNG LƯU',
    quote: '“Một tình yêu kiêu sa và lộng lẫy, thắp sáng mọi vũ hội xa hoa của cuộc đời.”',
    dressCode: [
      { name: 'Đen Rượu Vang', color: '#1A0407', border: false },
      { name: 'Vàng Champagne', color: '#E5C378', border: false },
      { name: 'Đỏ Nhung', color: '#511419', border: false },
      { name: 'Trắng Tinh Khôi', color: '#FFFFFF', border: true }
    ],
    bgDecor: `
        {/* Baroque vintage texture backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'url(/images/themes/baroque-v2-dark-red/bg.webp)', backgroundSize: '100% auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left', opacity: 0.65 }} />
        {/* Baroque floral corner flourishes */}
        <img src="/images/themes/baroque-v2-dark-red/flower5-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 h-auto max-w-none left-[-10%] top-[120px] w-[26%] opacity-60 animate-floral-sway" style={{ filter: 'drop-shadow(4px 4px 2px rgba(0,0,0,0.25))' }} />
        <img src="/images/themes/baroque-v2-dark-red/flower5-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 h-auto max-w-none right-[-10%] top-[120px] w-[26%] opacity-60 animate-floral-sway-slow" style={{ filter: 'drop-shadow(4px 4px 2px rgba(0,0,0,0.25))', transform: 'scaleX(-1)' }} />
    `,
    heroDecor: `
        {/* Filigree golden divider */}
        <img src="/images/themes/baroque-v2-dark-red/golden-line-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none mx-auto block h-auto w-[65%] max-w-[300px] object-contain my-3 relative z-10" style={{ filter: 'drop-shadow(4px 4px 2px rgba(0,0,0,0.25))' }} />
    `,
    ceremonyDecor: `
        <img src="/images/themes/baroque-v2-dark-red/line2-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none mx-auto mb-4 block h-auto w-[130px] object-contain relative z-10" style={{ filter: 'drop-shadow(4px 4px 2px rgba(0,0,0,0.25))' }} />
    `,
    timelineIcons: [
      '/images/themes/baroque-v2-dark-red/camera.webp',
      '/images/themes/baroque-v2-dark-red/cake.webp',
      '/images/themes/baroque-v2-dark-red/cook.webp',
      '/images/themes/baroque-v2-dark-red/camera.webp'
    ],
    footerDecor: `
        <img src="/images/themes/baroque-v2-dark-red/golden-line-decoration.webp" alt="" aria-hidden="true" className="pointer-events-none mx-auto block h-auto w-[65%] max-w-[280px] object-contain mt-4" style={{ filter: 'drop-shadow(4px 4px 2px rgba(0,0,0,0.25))' }} />
    `
  },
  {
    fileName: 'LotusPurityTemplate.tsx',
    componentName: 'LotusPurityTemplate',
    variant: 'lotus',
    outerBg: 'bg-[#0A1C1A]',
    cardBg: 'bg-[#F6FAF9]',
    textMain: 'text-[#163E3B]',
    borderColor: 'border-[#163E3B]/25',
    accentColor: '#CBB06B',
    invertedBg: 'bg-[#163E3B]',
    invertedText: 'text-[#E6F5F2]',
    invertedCardSub: 'bg-[#0E2927]',
    topBadge: 'LIÊN HOA THANH KHIẾT',
    quote: '“Hoa sen thanh cao giữa đất trời, cũng như tình yêu thuần khiết và chân thành của đôi ta.”',
    dressCode: [
      { name: 'Xanh Sen Ngọc', color: '#163E3B', border: false },
      { name: 'Xanh Cốm', color: '#5E8B86', border: false },
      { name: 'Beige Nhạt', color: '#F3DFC3', border: true },
      { name: 'Trắng Kem', color: '#F6FAF9', border: true }
    ],
    bgDecor: `
        {/* Paper texture overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 mix-blend-multiply" style={{ backgroundImage: 'url(/images/themes/lien-hoa-v2-green/paper-texture.webp)', backgroundSize: '100% auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left', opacity: 0.5 }} />
        {/* Soft watermark lotus in background (low opacity, behind everything) */}
        <img src="/images/themes/lien-hoa-v2-green/flower3.webp" alt="" aria-hidden="true" className="pointer-events-none absolute h-auto max-w-none object-contain -z-10 left-[15%] top-[100px] w-[55%] opacity-[0.07]" style={{ transform: 'rotate(-155deg) scaleY(-1)' }} />
        {/* Side lotus flourishes strictly along the outer edges behind text with gentle breeze sway */}
        <img src="/images/themes/lien-hoa-v2-green/flower6.webp" alt="" aria-hidden="true" className="pointer-events-none absolute h-auto max-w-none object-contain -z-10 -right-8 top-[80px] w-[140px] sm:w-[180px] opacity-35 animate-floral-sway" />
        <img src="/images/themes/lien-hoa-v2-green/flower1.webp" alt="" aria-hidden="true" className="pointer-events-none absolute h-auto max-w-none object-contain -z-10 -left-8 top-[600px] w-[130px] sm:w-[160px] opacity-35 animate-floral-sway-slow" />
    `,
    heroDecor: `
        <img src="/images/themes/lien-hoa-v2-green/flower5.webp" alt="" aria-hidden="true" className="pointer-events-none mx-auto w-12 sm:w-14 object-contain mb-2 relative z-10" style={{ filter: 'drop-shadow(2px 3px 2px rgba(18,77,0,0.15))' }} />
    `,
    ceremonyDecor: ``,
    timelineIcons: [
      '/images/themes/lien-hoa-v2-green/medallion-ring.webp',
      '/images/themes/lien-hoa-v2-green/medallion-drink.webp',
      '/images/themes/lien-hoa-v2-green/medallion-cake.webp',
      '/images/themes/lien-hoa-v2-green/medallion-ring.webp'
    ],
    footerDecor: `
        <img src="/images/themes/lien-hoa-v2-green/flower4-bottom.webp" alt="" aria-hidden="true" className="block h-auto mt-4 w-[115%] max-w-none shrink-0 -mb-12 pointer-events-none object-contain animate-floral-sway-slow" style={{ transform: 'scaleX(-1)', filter: 'drop-shadow(3px 4px 3px rgba(18,77,0,0.18))' }} />
    `
  }
];

function generateTemplate(t) {
  const dressCodeJsx = t.dressCode.map((c, idx) => `
              <motion.div
                key="${c.name}"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 280, damping: 18, delay: ${idx} * 0.1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-10 h-10 rounded-full shadow-md ${c.border ? 'border border-stone-300' : ''} transition-transform hover:scale-110"
                  style={{ backgroundColor: '${c.color}' }}
                />
                <span className="text-[11px] font-body-text ${t.textMain} font-medium">${c.name}</span>
              </motion.div>`).join('');

  const timelineItems = [
    { time: '17:30', title: 'Đón Tiếp Khách Quý & Chụp Ảnh' },
    { time: '18:30', title: 'Nghi Thức Lễ Thành Hôn Trang Trọng' },
    { time: '19:15', title: 'Khai Tiệc Mừng & Rót Rượu Giao Bôi' },
    { time: '20:30', title: 'Chụp Ảnh Kỷ Niệm & Cảm Ơn' }
  ];

  const timelineJsx = timelineItems.map((item, idx) => {
    const iconSrc = t.timelineIcons ? t.timelineIcons[idx] : null;
    const iconElement = iconSrc
      ? `<img src="${iconSrc}" alt="" className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow" />`
      : `<svg className="w-5 h-5 shrink-0 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

    return `
              <motion.div
                key={${idx}}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: ${idx} * 0.12 }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-3.5 rounded-2xl ${t.invertedCardSub} border border-white/20 shadow-sm relative overflow-hidden"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 shrink-0 shadow-inner"
                  style={{ color: '${t.accentColor}' }}
                >
                  ${iconElement}
                </div>
                <div className="flex-1">
                  <span className="font-heading-display font-bold text-xs uppercase tracking-wider block" style={{ color: '${t.accentColor}' }}>
                    ${item.time}
                  </span>
                  <span className="font-body-text text-sm font-semibold">
                    ${item.title}
                  </span>
                </div>
              </motion.div>`;
  }).join('\n');

  return `'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AudioPlayer from '../components/AudioPlayer'
import ImageLightbox from '../components/ImageLightbox'
import EnvelopeOpening from '../components/EnvelopeOpening'
import FloatingParticles from '../components/FloatingParticles'
import { supabase } from '@/lib/supabaseClient'
import { TemplateProps, Wish } from './types'

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

const formatShortDate = (dateStr?: string | null) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr))
}

const formatTime = (timeStr?: string | null) => {
  if (!timeStr) return '11:00'
  return timeStr.slice(0, 5)
}

export default function ${t.componentName}({
  couple,
  gallery = [],
  wishes = [],
  weddingGift,
  locations,
  guestName,
  defaultOpen = false,
}: TemplateProps) {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [activeGiftTab, setActiveGiftTab] = useState<'groom' | 'bride'>('groom')
  const [formName, setFormName] = useState(guestName || '')
  const [formMessage, setFormMessage] = useState('')
  const [formAttendance, setFormAttendance] = useState<'yes' | 'no' | 'maybe'>('yes')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  useEffect(() => {
    setLocalWishes(wishes)
  }, [wishes])

  // Countdown timer logic
  const [daysLeft, setDaysLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!couple.wedding_date) return

    const calculateCountdown = () => {
      const target = new Date(couple.wedding_date + 'T' + (couple.wedding_time || '11:00:00')).getTime()
      const now = new Date().getTime()
      const diff = Math.max(0, target - now)

      setDaysLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calculateCountdown()
    const timer = setInterval(calculateCountdown, 1000)
    return () => clearInterval(timer)
  }, [couple.wedding_date, couple.wedding_time])

  const defaultHero = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
  const heroImage = couple.hero_image || (gallery.length > 0 ? gallery[0].image_url : defaultHero)

  const displayedGallery = gallery.length > 0
    ? gallery
    : [
        { id: 1, image_url: defaultHero, sort_order: 1 },
        { id: 2, image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', sort_order: 2 },
        { id: 3, image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', sort_order: 3 },
      ]

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formMessage.trim()) return

    setIsSubmitting(true)
    const newWishItem: Wish = {
      id: Date.now(),
      couple_id: couple.id,
      name: formName.trim(),
      message: formMessage.trim(),
      attendance: formAttendance,
      created_at: new Date().toISOString(),
    }

    try {
      if (couple.id && couple.id > 0) {
        const { error } = await supabase.from('wishes').insert({
          couple_id: couple.id,
          name: formName.trim(),
          message: formMessage.trim(),
          attendance: formAttendance,
        })
        if (error) throw error
      }

      setLocalWishes((prev) => [newWishItem, ...prev])
      setFormMessage('')
      setToastMsg('Cảm ơn bạn đã gửi lời chúc phúc!')
      setTimeout(() => setToastMsg(''), 3500)
    } catch {
      setToastMsg('Không thể gửi lời chúc, vui lòng thử lại sau.')
      setTimeout(() => setToastMsg(''), 3500)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyAccount = (accountNo: string) => {
    navigator.clipboard.writeText(accountNo)
    setCopiedAccount(accountNo)
    setTimeout(() => setCopiedAccount(null), 2500)
  }

  const receptionAddress = locations?.groom_address || couple.address || ''

  const googleCalendarUrl = couple.wedding_date
    ? \`https://calendar.google.com/calendar/render?action=TEMPLATE&text=\${encodeURIComponent(
        \`Lễ Thành Hôn - \${couple.groom_name} & \${couple.bride_name}\`
      )}&dates=\${couple.wedding_date.replace(/-/g, '')}T090000Z/\${couple.wedding_date.replace(
        /-/g,
        ''
      )}T140000Z&details=\${encodeURIComponent('Kính mời quý khách tham dự lễ cưới chung đôi!')}&location=\${encodeURIComponent(
        receptionAddress
      )}\`
    : '#'

  const giftEnabled = weddingGift?.is_enabled ?? couple.gift_enabled ?? true

  const groomBankName = weddingGift?.groom_bank_name || couple.groom_bank_name || 'Vietcombank'
  const groomBankHolder = weddingGift?.groom_bank_holder || couple.groom_bank_holder || couple.groom_name
  const groomBankAccount = weddingGift?.groom_bank_account || couple.groom_bank_account || '1234567890'
  const groomBankQr = weddingGift?.groom_bank_qr || couple.groom_bank_qr

  const brideBankName = weddingGift?.bride_bank_name || couple.bride_bank_name || 'MB Bank'
  const brideBankHolder = weddingGift?.bride_bank_holder || couple.bride_bank_holder || couple.bride_name
  const brideBankAccount = weddingGift?.bride_bank_account || couple.bride_bank_account || '0987654321'
  const brideBankQr = weddingGift?.bride_bank_qr || couple.bride_bank_qr

  return (
    // Outer ambient background on laptop / desktop
    <div className="min-h-screen w-full ${t.outerBg} sm:py-6 md:py-10 flex justify-center selection:bg-amber-500/20 font-body-text">
      {/* 1. Envelope Opening Stage */}
      <EnvelopeOpening couple={couple} themeVariant="${t.variant}" guestName={guestName} defaultOpen={defaultOpen} />

      {/* Audio Player */}
      <AudioPlayer
        musicUrl={couple.music_url || 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-violin-1100.mp3'}
        delay={0}
        volume={couple.music_volume ?? 0.4}
        autoplay={couple.music_autoplay ?? true}
      />

      {/* Main Centered Wedding Card Container - Responsive for Laptop & Mobile */}
      <div className="relative w-full max-w-[480px] md:max-w-[760px] lg:max-w-[820px] overflow-hidden ${t.cardBg} ${t.textMain} md:rounded-3xl md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] md:border ${t.borderColor} isolate">
        
        {/* Background Textures & Backdrops */}
        ${t.bgDecor}

        {/* Ambient Romantic Floating Petals & Sparkles System */}
        <FloatingParticles variant="${t.variant}" />

        {/* Subtle Ambient Decorative Sparkles */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-12 left-6 w-2 h-2 rounded-full bg-current opacity-25 animate-ping" />
          <div className="absolute top-1/4 right-8 w-2.5 h-2.5 rounded-full bg-current opacity-30 animate-pulse" />
          <div className="absolute top-2/3 left-8 w-2 h-2 rounded-full bg-current opacity-20 animate-pulse" />
        </div>

        {/* 2. Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pt-10 sm:pt-14 pb-14 px-6 sm:px-10 flex flex-col items-center text-center"
        >
          <div className="w-full flex flex-col items-center relative z-10">
            ${t.heroDecor}

            {/* Top Badge */}
            <span className="font-badge-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-current/10 text-current text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 border border-current/20 shadow-sm relative z-10 shimmer-badge">
              <span>✦</span> ${t.topBadge} <span>✦</span>
            </span>

            <p className="font-heading-display opacity-80 uppercase tracking-[0.28em] text-[11px] sm:text-xs mb-2 relative z-10">
              TRÂN TRỌNG BÁO TIN LỄ THÀNH HÔN
            </p>

            <motion.h1
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-cursive-names text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide text-current leading-tight my-2 relative z-10 drop-shadow-sm"
            >
              {couple.groom_name}
              <span className="block font-heading-display text-2xl sm:text-3xl font-light my-0.5 opacity-80" style={{ color: '${t.accentColor}' }}>
                &amp;
              </span>
              {couple.bride_name}
            </motion.h1>

            {/* Parents Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-4 sm:gap-8 my-6 py-4 border-y border-current/20 w-full max-w-lg text-xs sm:text-sm relative z-10"
            >
              <div className="text-center">
                <p className="font-heading-display uppercase tracking-widest font-bold">NHÀ TRAI</p>
                <p className="font-body-text opacity-80 mt-1">Ông: Đặng Văn Hùng</p>
                <p className="font-body-text opacity-80">Bà: Hoàng Thị Mai</p>
                <p className="font-quote-lora italic mt-1 font-semibold" style={{ color: '${t.accentColor}' }}>Trưởng Nam</p>
              </div>
              <div className="text-center border-l border-current/20 pl-4">
                <p className="font-heading-display uppercase tracking-widest font-bold">NHÀ GÁI</p>
                <p className="font-body-text opacity-80 mt-1">Ông: Vũ Quốc Tuấn</p>
                <p className="font-body-text opacity-80">Bà: Nguyễn Thị Lan</p>
                <p className="font-quote-lora italic mt-1 font-semibold" style={{ color: '${t.accentColor}' }}>Quý Nữ</p>
              </div>
            </motion.div>

            {/* Arch Frame Wedding Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-2 w-full max-w-[300px] sm:max-w-[360px] aspect-[3/4] rounded-t-[180px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white/60 ring-1 ring-current/25 group"
            >
              <img
                src={heroImage}
                alt="Ảnh cưới"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 inset-x-0 text-white text-center pointer-events-none">
                <p className="font-heading-display text-xs uppercase tracking-widest font-medium opacity-90">
                  {formatDate(couple.wedding_date)}
                </p>
              </div>
            </motion.div>

            <p className="mt-6 opacity-85 text-xs sm:text-sm max-w-md mx-auto font-quote-lora italic leading-relaxed relative z-10">
              {couple.intro_description || '${t.quote}'}
            </p>
          </div>
        </motion.header>

        {/* 3. Ceremonial Details */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75 }}
          className="py-10 px-6 sm:px-10 ${t.invertedBg} ${t.invertedText} relative z-10 overflow-hidden"
        >
          ${t.ceremonyDecor}
          <div className="text-center mb-8 relative z-10">
            <span className="text-xl" style={{ color: '${t.accentColor}' }}>✦ ✦ ✦</span>
            <h2 className="font-heading-display text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1">
              THÔNG TIN LỄ CƯỚI
            </h2>
            <p className="font-badge-text opacity-75 text-[11px] tracking-widest uppercase mt-1">
              CEREMONY &amp; RECEPTION
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 relative z-10">
            {/* Nhà Gái */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="${t.invertedCardSub} rounded-2xl p-5 sm:p-6 border border-white/20 flex flex-col justify-between shadow-md"
            >
              <div>
                <span className="font-badge-text px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider border border-white/25 inline-block" style={{ color: '${t.accentColor}' }}>
                  {locations?.bride_event_title || 'Lễ Vu Quy (Nhà Gái)'}
                </span>
                <h3 className="font-heading-display text-lg sm:text-xl font-bold mt-3">
                  {locations?.bride_location || 'Tư Gia Nhà Gái'}
                </h3>
                <p className="font-body-text text-xs opacity-80 mt-1 leading-relaxed">
                  {locations?.bride_address || 'Địa chỉ tư gia nhà gái'}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-body-text">
                  <span className="opacity-70 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Thời gian:
                  </span>
                  <span className="font-bold font-heading-display" style={{ color: '${t.accentColor}' }}>
                    {formatTime(locations?.bride_event_time || couple.wedding_time)} -{' '}
                    {formatShortDate(locations?.bride_event_date || couple.wedding_date)}
                  </span>
                </div>
              </div>

              {locations?.bride_address && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={\`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(
                    locations.bride_address
                  )}\`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-white text-stone-900 hover:opacity-95 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm font-body-text"
                >
                  <svg className="w-4 h-4 shrink-0 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Chỉ Đường Đến Nhà Gái</span>
                </motion.a>
              )}
            </motion.div>

            {/* Nhà Trai */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="${t.invertedCardSub} rounded-2xl p-5 sm:p-6 border border-white/20 flex flex-col justify-between shadow-md"
            >
              <div>
                <span className="font-badge-text px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider border border-white/25 inline-block" style={{ color: '${t.accentColor}' }}>
                  {locations?.groom_event_title || 'Lễ Thành Hôn (Nhà Trai)'}
                </span>
                <h3 className="font-heading-display text-lg sm:text-xl font-bold mt-3">
                  {locations?.groom_location || 'Tư Gia Nhà Trai'}
                </h3>
                <p className="font-body-text text-xs opacity-80 mt-1 leading-relaxed">
                  {locations?.groom_address || 'Địa chỉ tư gia nhà trai'}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-body-text">
                  <span className="opacity-70 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Thời gian:
                  </span>
                  <span className="font-bold font-heading-display" style={{ color: '${t.accentColor}' }}>
                    {formatTime(locations?.groom_event_time || couple.wedding_time)} -{' '}
                    {formatShortDate(locations?.groom_event_date || couple.wedding_date)}
                  </span>
                </div>
              </div>

              {locations?.groom_address && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={\`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(
                    locations.groom_address
                  )}\`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-white text-stone-900 hover:opacity-95 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm font-body-text"
                >
                  <svg className="w-4 h-4 shrink-0 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Chỉ Đường Đến Nhà Trai</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* 4. Wedding Reception & Countdown Section */}
        {couple.wedding_date && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="py-12 px-6 sm:px-10 text-center border-b border-current/15 relative z-10"
          >
            <p className="font-badge-text text-xs font-semibold uppercase tracking-[0.25em] mb-1 opacity-75">
              THÔNG TIN TIỆC CƯỚI
            </p>
            <h2 className="font-heading-display text-2xl sm:text-3xl font-bold mb-4">
              Cùng Đếm Ngược
            </h2>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto my-6">
              {[
                { label: 'Ngày', value: daysLeft.days },
                { label: 'Giờ', value: daysLeft.hours },
                { label: 'Phút', value: daysLeft.minutes },
                { label: 'Giây', value: daysLeft.seconds },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/85 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-sm border border-current/20 flex flex-col items-center transition-shadow hover:shadow-md"
                >
                  <span className="font-heading-display text-2xl sm:text-3xl font-bold" style={{ color: '${t.accentColor}' }}>
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="font-body-text text-[10px] sm:text-xs opacity-70 uppercase font-medium mt-1">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${t.invertedBg} ${t.invertedText} hover:opacity-95 text-xs font-bold shadow-md transition font-body-text"
              >
                <svg className="w-4 h-4 shrink-0 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Thêm Vào Lịch (Google Calendar)</span>
              </motion.a>
              {receptionAddress && (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={\`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(
                    receptionAddress
                  )}\`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-current border border-current/30 hover:bg-stone-50 text-xs font-bold shadow-sm transition font-body-text"
                >
                  <svg className="w-4 h-4 shrink-0 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Chỉ Đường Đến Tiệc Cưới</span>
                </motion.a>
              )}
            </div>
          </motion.section>
        )}

        {/* 5. Photo Album */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="py-12 px-6 sm:px-10 relative z-10"
        >
          <div className="text-center mb-8">
            <p className="font-badge-text text-xs uppercase tracking-[0.25em] font-bold opacity-75">
              KHOẢNH KHẮC YÊU THƯƠNG
            </p>
            <h2 className="font-heading-display text-2xl sm:text-3xl font-bold mt-1">
              Album Ảnh Cưới
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {displayedGallery.map((img, index) => (
              <motion.div
                key={img.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (index % 6) * 0.08 }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                onClick={() => setSelectedGalleryIndex(index)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-current/15 bg-stone-100"
              >
                <img
                  src={img.image_url}
                  alt="Ảnh cưới"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white text-stone-900 shadow-lg text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. Dress Code */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-10 px-6 sm:px-10 border-t border-current/15 text-center relative z-10"
        >
          <h3 className="font-heading-display text-xl font-bold uppercase tracking-wider">
            DRESS CODE
          </h3>
          <p className="font-body-text text-xs opacity-75 mt-1 mb-6 max-w-sm mx-auto">
            Quý khách vui lòng diện trang phục theo bảng màu gợi ý để những khung hình kỷ niệm thêm phần đồng điệu:
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            ${dressCodeJsx}
          </div>
        </motion.section>

        {/* 7. Wedding Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="py-12 px-6 sm:px-10 ${t.invertedBg} ${t.invertedText} relative z-10 overflow-hidden"
        >
          <div className="text-center mb-8">
            <h2 className="font-heading-display text-2xl font-bold uppercase tracking-wider">
              LỊCH TRÌNH NGÀY CƯỚI
            </h2>
            <p className="font-badge-text opacity-75 text-xs tracking-widest mt-1">WEDDING TIMELINE</p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            ${timelineJsx}
          </div>
        </motion.section>

        {/* 8. Sổ Lưu Bút */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="py-12 px-6 sm:px-10 relative z-10"
        >
          <div className="text-center mb-6">
            <h2 className="font-heading-display text-2xl font-bold uppercase tracking-wider">
              SỔ LƯU BÚT
            </h2>
            <p className="font-body-text text-xs opacity-75 mt-1">
              Gửi lời chúc phúc ngọt ngào cho cô dâu &amp; chú rể
            </p>
          </div>

          <form onSubmit={handleWishSubmit} className="max-w-md mx-auto space-y-4 font-body-text">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                Tên của bạn
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Nhập tên của bạn..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-current/25 bg-white/70 focus:outline-none focus:ring-2 focus:ring-current/30 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                Lời chúc của bạn
              </label>
              <textarea
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Gửi lời chúc phúc chân thành đến đôi uyên ương..."
                rows={3}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-current/25 bg-white/70 focus:outline-none focus:ring-2 focus:ring-current/30 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                Bạn có tham dự không?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'yes', label: 'Chắc chắn sẽ tới' },
                  { key: 'maybe', label: 'Chưa rõ lịch' },
                  { key: 'no', label: 'Rất tiếc không thể' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFormAttendance(opt.key as any)}
                    className={\`py-2 px-1 text-xs rounded-xl font-medium border transition text-center \${
                      formAttendance === opt.key
                        ? '${t.invertedBg} ${t.invertedText} border-transparent shadow'
                        : 'border-current/20 bg-white/50 opacity-70 hover:opacity-100'
                    }\`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl ${t.invertedBg} ${t.invertedText} hover:opacity-95 font-bold text-sm shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi Lời Chúc Phúc'}
            </motion.button>

            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-center rounded-xl bg-emerald-600 text-white font-medium text-xs shadow-lg"
              >
                {toastMsg}
              </motion.div>
            )}
          </form>

          {/* List of recent wishes */}
          {localWishes.length > 0 && (
            <div className="max-w-md mx-auto mt-8 pt-6 border-t border-current/15">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-80">
                Lời chúc gần đây ({localWishes.length})
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {localWishes.map((w, idx) => (
                  <div key={w.id || idx} className="p-3 rounded-xl bg-white/60 border border-current/10 text-xs shadow-sm">
                    <p className="font-bold text-current">{w.name || 'Khách quý'}</p>
                    <p className="opacity-80 mt-0.5">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* 9. Hộp Quà Mừng */}
        {giftEnabled && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-10 px-6 sm:px-10 text-center border-t border-current/15 bg-current/5 font-body-text relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowGiftModal(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full ${t.invertedBg} ${t.invertedText} hover:opacity-95 font-bold text-sm shadow-xl transition animate-soft-glow"
            >
              <svg className="w-5 h-5 shrink-0 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="7" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              <span>Hộp Quà Mừng &amp; Mã QR</span>
            </motion.button>
          </motion.section>
        )}

        {/* Gift Modal Popup */}
        <AnimatePresence>
          {showGiftModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-body-text"
              onClick={() => setShowGiftModal(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="${t.cardBg} ${t.textMain} rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border ${t.borderColor} relative"
              >
                <button
                  onClick={() => setShowGiftModal(false)}
                  className="absolute top-4 right-4 opacity-50 hover:opacity-100 text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5"
                >
                  ✕
                </button>

                <div className="text-center mb-6">
                  <span className="font-badge-text text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-current/10 border border-current/15 inline-block mb-2">
                    MỪNG CƯỚI CHUNG ĐÔI
                  </span>
                  <h3 className="font-heading-display text-2xl font-bold">
                    Hộp Quà Mừng
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    Cảm ơn tình cảm và sự chúc phúc chân thành của quý khách
                  </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-current/10 rounded-2xl mb-6">
                  <button
                    onClick={() => setActiveGiftTab('groom')}
                    className={\`py-2 rounded-xl text-xs font-bold transition \${
                      activeGiftTab === 'groom'
                        ? '${t.invertedBg} ${t.invertedText} shadow'
                        : 'opacity-70 hover:opacity-100'
                    }\`}
                  >
                    Mừng Chú Rể
                  </button>
                  <button
                    onClick={() => setActiveGiftTab('bride')}
                    className={\`py-2 rounded-xl text-xs font-bold transition \${
                      activeGiftTab === 'bride'
                        ? '${t.invertedBg} ${t.invertedText} shadow'
                        : 'opacity-70 hover:opacity-100'
                    }\`}
                  >
                    Mừng Cô Dâu
                  </button>
                </div>

                {/* Active Tab Content */}
                {activeGiftTab === 'groom' ? (
                  <div className="flex flex-col items-center text-center space-y-4">
                    {groomBankQr ? (
                      <div className="p-3 bg-white rounded-2xl shadow border border-current/15 max-w-[200px]">
                        <img src={groomBankQr} alt="QR Chú Rể" className="w-full h-auto rounded-lg" />
                      </div>
                    ) : (
                      <div className="p-6 bg-white/60 rounded-2xl border border-current/15 text-xs opacity-70">
                        Chưa cập nhật mã QR
                      </div>
                    )}
                    <div className="w-full bg-white/80 rounded-2xl p-4 border border-current/15 text-xs text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="opacity-70">Ngân hàng:</span>
                        <span className="font-bold">{groomBankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Chủ tài khoản:</span>
                        <span className="font-bold">{groomBankHolder}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-current/10">
                        <span className="opacity-70">Số tài khoản:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold tracking-wider">{groomBankAccount}</span>
                          <button
                            onClick={() => handleCopyAccount(groomBankAccount)}
                            className="p-1 px-2 rounded-md bg-current/10 hover:bg-current/20 text-[10px] font-bold flex items-center gap-1 transition"
                          >
                            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                            {copiedAccount === groomBankAccount ? 'Đã chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-4">
                    {brideBankQr ? (
                      <div className="p-3 bg-white rounded-2xl shadow border border-current/15 max-w-[200px]">
                        <img src={brideBankQr} alt="QR Cô Dâu" className="w-full h-auto rounded-lg" />
                      </div>
                    ) : (
                      <div className="p-6 bg-white/60 rounded-2xl border border-current/15 text-xs opacity-70">
                        Chưa cập nhật mã QR
                      </div>
                    )}
                    <div className="w-full bg-white/80 rounded-2xl p-4 border border-current/15 text-xs text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="opacity-70">Ngân hàng:</span>
                        <span className="font-bold">{brideBankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Chủ tài khoản:</span>
                        <span className="font-bold">{brideBankHolder}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-current/10">
                        <span className="opacity-70">Số tài khoản:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold tracking-wider">{brideBankAccount}</span>
                          <button
                            onClick={() => handleCopyAccount(brideBankAccount)}
                            className="p-1 px-2 rounded-md bg-current/10 hover:bg-current/20 text-[10px] font-bold flex items-center gap-1 transition"
                          >
                            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                            {copiedAccount === brideBankAccount ? 'Đã chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 10. Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 px-6 text-center border-t border-current/15 opacity-90 text-xs relative z-10 overflow-hidden"
        >
          <p className="font-heading-display uppercase tracking-widest font-bold">
            Cảm ơn quý khách đã chung vui cùng chúng tôi
          </p>
          <p className="font-cursive-names text-2xl sm:text-3xl mt-2" style={{ color: '${t.accentColor}' }}>
            {couple.groom_name} &amp; {couple.bride_name}
          </p>
          <p className="font-badge-text text-[10px] uppercase tracking-[0.25em] opacity-60 mt-3">
            HẠNH PHÚC TRĂM NĂM • FOREVER TOGETHER
          </p>
          ${t.footerDecor}
        </motion.footer>

        {/* Lightbox for Gallery */}
        <ImageLightbox
          images={displayedGallery}
          selectedIndex={selectedGalleryIndex}
          onClose={() => setSelectedGalleryIndex(null)}
          onNext={() =>
            setSelectedGalleryIndex((prev) =>
              prev === null ? null : (prev + 1) % displayedGallery.length
            )
          }
          onPrev={() =>
            setSelectedGalleryIndex((prev) =>
              prev === null ? null : (prev - 1 + displayedGallery.length) % displayedGallery.length
            )
          }
        />
      </div>
    </div>
  )
}
`;
}

const templatesDir = path.join(__dirname, '..', 'app', '[slug]', 'templates');

for (const t of all10) {
  const filePath = path.join(templatesDir, t.fileName);
  fs.writeFileSync(filePath, generateTemplate(t), 'utf8');
  console.log('Regenerated with rich animation:', t.fileName);
}

console.log('All 10 templates regenerated successfully with rich, smooth animations!');
