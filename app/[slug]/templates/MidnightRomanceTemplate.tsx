'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { TemplateProps } from './types'
import { supabase } from '@/lib/supabaseClient'
// components
import AudioPlayer from '../components/AudioPlayer'
import ImageLightbox from '../components/ImageLightbox'

// --- Formatting Helpers ---
const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(dateStr))
}

const formatShortDate = (dateStr?: string | null) => {
    if (!dateStr) return ''
    return new Intl.DateTimeFormat('vi-VN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(new Date(dateStr))
}

// --- Floating Particles ---
function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
    setParticles(p)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-200/40"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}
    </div>
  )
}

// --- Infinite Gallery ---
function InfiniteGallery({ images, onSelect }: { images: any[]; onSelect: (index: number) => void }) {
  if (!images || images.length === 0) return null
  
  // Duplicate images for infinite scroll
  const scrollImages = [...images, ...images, ...images] // Triple to ensure enough content to loop

  return (
    <div className="relative w-full overflow-hidden py-10" style={{ touchAction: 'pan-y' }}>
        <motion.div 
            className="flex gap-4 w-max"
            animate={{ x: [0, -images.length * 266] }} // 250px + 16px gap = 266px per item
            transition={{
                duration: images.length * 4,
                ease: "linear",
                repeat: Infinity,
            }}
            whileHover={{ animationPlayState: 'paused' }}
            whileTap={{ animationPlayState: 'paused' }}
        >
            {scrollImages.map((img, idx) => (
                <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(idx % images.length)}
                    className="w-[250px] h-[350px] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.15)] border border-white/10 group text-left"
                >
                    <img src={img.image_url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-60" />
                </button>
            ))}
        </motion.div>
    </div>
  )
}

// --- Main Template ---
export default function MidnightRomanceTemplate({ couple, gallery, wishes, weddingGift, locations }: TemplateProps) {
  const { scrollYProgress } = useScroll()
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const heroImage = gallery?.[0]?.image_url || couple.bride_avatar || couple.groom_avatar || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600'
  
  const [formName, setFormName] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)

  const handleRSVP = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!formName.trim() || !formMsg.trim()) return
      
      setIsSubmitting(true)
      try {
          await supabase.from('wishes').insert([
              { couple_id: couple.id, name: formName.trim(), message: formMsg.trim() }
          ])
          setToastMsg('Gửi lời chúc thành công!')
          setFormName('')
          setFormMsg('')
          setTimeout(() => setToastMsg(''), 3000)
      } catch (e) {
          setToastMsg('Có lỗi xảy ra.')
          setTimeout(() => setToastMsg(''), 3000)
      } finally {
          setIsSubmitting(false)
      }
  }

  // Fade Up Variants
    const fadeUp: Variants = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  // Timeline Data
  const timelineEvents = [
      {
          title: locations?.bride_event_title || 'Lễ Vu Quy',
          date: locations?.bride_event_date || couple.wedding_date,
          time: locations?.bride_event_time || couple.wedding_time,
          location: locations?.bride_location,
          address: locations?.bride_address,
          mapLink: locations?.bride_google_map_embed
      },
      {
          title: locations?.groom_event_title || 'Lễ Thành Hôn',
          date: locations?.groom_event_date || couple.wedding_date,
          time: locations?.groom_event_time || couple.wedding_time,
          location: locations?.groom_location,
          address: locations?.groom_address,
          mapLink: locations?.groom_google_map_embed
      }
  ].filter(e => e.title && (e.location || e.address))

  return (
    <div className="relative bg-[#0B132B] text-white overflow-x-hidden selection:bg-rose-400/30">
        <FloatingParticles />

        {/* SECTION 1: HERO PARALLAX */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img src={heroImage} alt="Hero" className="w-full h-full object-cover object-center" />
            </motion.div>

            <motion.div 
                className="relative z-20 text-center px-4"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <p className="text-sm md:text-base tracking-[0.4em] uppercase text-amber-200/80 mb-6 font-light">
                    We're getting married
                </p>
                <h1 className="font-display text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-rose-200 to-amber-100 drop-shadow-lg mb-6 leading-tight py-2">
                    {couple.bride_name} <br className="md:hidden"/> <span className="text-4xl text-rose-300">&amp;</span> <br className="md:hidden"/> {couple.groom_name}
                </h1>
                <div className="w-px h-16 bg-gradient-to-b from-amber-200 to-transparent mx-auto mb-6" />
                <p className="text-lg md:text-xl font-light tracking-wider text-white/90">
                    {formatDate(couple.wedding_date)}
                </p>
            </motion.div>

            <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Cuộn để khám phá</span>
                <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </motion.div>
        </section>

        {/* INTRO */}
        <section className="relative z-10 py-24 px-6 max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <svg className="w-8 h-8 mx-auto text-rose-300/60 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 italic">
                    "{couple.intro_description || 'Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi trong ngày trọng đại. Sự hiện diện của quý khách là niềm vinh hạnh lớn lao.'}"
                </p>
            </motion.div>
        </section>

        {/* SECTION 2: TIMELINE */}
        <section className="relative z-10 py-24 bg-[#080E21]">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2 
                    className="text-center font-display text-4xl md:text-5xl text-amber-100 mb-20"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                >
                    Chương Trình <br/> <span className="text-2xl text-rose-300 font-sans tracking-[0.2em] uppercase font-light">Ngày Vui</span>
                </motion.h2>

                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-400/0 via-rose-400/50 to-rose-400/0 -translate-x-1/2" />
                    
                    <div className="space-y-16">
                        {timelineEvents.map((evt, idx) => (
                            <motion.div 
                                key={idx}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {/* Center dot */}
                                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.8)] -translate-x-1/2 mt-6 md:mt-0" />
                                
                                <div className="w-full md:w-1/2" /> {/* Spacer */}
                                
                                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-500">
                                        <p className="text-rose-300 font-medium tracking-wider text-sm mb-2">{formatShortDate(evt.date)} • {evt.time}</p>
                                        <h3 className="font-display text-2xl text-amber-50 mb-3">{evt.title}</h3>
                                        <p className="text-white/70 text-sm leading-relaxed mb-4">
                                            <strong className="text-white/90">{evt.location}</strong><br/>
                                            {evt.address}
                                        </p>
                                        {evt.mapLink && (
                                            <a href={evt.mapLink} target="_blank" rel="noreferrer" className="inline-block px-5 py-2 text-xs uppercase tracking-widest border border-rose-300/50 rounded-full text-rose-200 hover:bg-rose-300 hover:text-[#0B132B] transition-all duration-300">
                                                Xem Bản Đồ
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: INFINITE GALLERY */}
        <section className="relative z-10 py-24 overflow-hidden">
             <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="font-display text-4xl text-amber-100">Khoảnh Khắc</h2>
                <p className="text-rose-300 tracking-[0.3em] uppercase text-xs mt-2 font-light">Lưu giữ kỷ niệm</p>
             </motion.div>
             
               <InfiniteGallery images={gallery} onSelect={setSelectedGalleryIndex} />
        </section>

        {/* WEDDING GIFT */}
        {weddingGift?.is_enabled && (
             <section className="relative z-10 py-24 px-6 bg-[#080E21]">
                <motion.div className="max-w-xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <h2 className="font-display text-4xl text-amber-100 mb-10">Hộp Mừng Cưới</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {weddingGift.bride_bank_name && weddingGift.bride_bank_account && (
                            <div className="bg-white/5 backdrop-blur-md border border-rose-300/20 rounded-2xl p-6 hover:border-rose-300/50 transition-colors">
                                <p className="text-rose-300 text-xs uppercase tracking-widest mb-4">Nhà Gái</p>
                                {weddingGift.bride_bank_qr && (
                                    <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl mb-4">
                                        <img src={weddingGift.bride_bank_qr} alt="QR" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <p className="font-medium text-amber-50 mb-1">{weddingGift.bride_bank_name}</p>
                                <p className="text-white/80 text-sm tracking-wider mb-1">{weddingGift.bride_bank_account}</p>
                                <p className="text-white/60 text-xs uppercase">{weddingGift.bride_bank_holder}</p>
                            </div>
                        )}
                        {weddingGift.groom_bank_name && weddingGift.groom_bank_account && (
                            <div className="bg-white/5 backdrop-blur-md border border-rose-300/20 rounded-2xl p-6 hover:border-rose-300/50 transition-colors">
                                <p className="text-rose-300 text-xs uppercase tracking-widest mb-4">Nhà Trai</p>
                                {weddingGift.groom_bank_qr && (
                                    <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl mb-4">
                                        <img src={weddingGift.groom_bank_qr} alt="QR" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <p className="font-medium text-amber-50 mb-1">{weddingGift.groom_bank_name}</p>
                                <p className="text-white/80 text-sm tracking-wider mb-1">{weddingGift.groom_bank_account}</p>
                                <p className="text-white/60 text-xs uppercase">{weddingGift.groom_bank_holder}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </section>
        )}

        {gallery.length > 0 && (
            <ImageLightbox
                images={gallery}
                selectedIndex={selectedGalleryIndex}
                onClose={() => setSelectedGalleryIndex(null)}
                onPrev={() =>
                    setSelectedGalleryIndex((current) =>
                        current === null ? null : (current - 1 + gallery.length) % gallery.length
                    )
                }
                onNext={() =>
                    setSelectedGalleryIndex((current) =>
                        current === null ? null : (current + 1) % gallery.length
                    )
                }
            />
        )}

        {/* SECTION 4: RSVP FORM */}
        <section className="relative z-10 py-32 px-6 overflow-hidden flex justify-center items-center">
            {/* Mesh gradient background */}
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
                <div className="w-[500px] h-[500px] bg-rose-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />
                <div className="w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 absolute top-10 right-10" />
            </div>

            <motion.div 
                className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
                <h2 className="font-display text-4xl text-amber-100 text-center mb-2">Gửi Lời Chúc</h2>
                <p className="text-white/50 text-sm text-center mb-10 font-light">Sự hiện diện và lời chúc của bạn là niềm vinh hạnh của chúng tôi</p>

                <form onSubmit={handleRSVP} className="space-y-8">
                    <div className="relative group">
                        <input 
                            type="text" 
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Tên của bạn..." 
                            className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white placeholder-white/30 focus:outline-none focus:border-rose-400 transition-colors"
                        />
                    </div>
                    <div className="relative group">
                        <textarea 
                            required
                            value={formMsg}
                            onChange={(e) => setFormMsg(e.target.value)}
                            rows={3}
                            placeholder="Lời chúc yêu thương..." 
                            className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white placeholder-white/30 focus:outline-none focus:border-rose-400 transition-colors resize-none"
                        />
                    </div>

                    <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="relative w-full py-4 overflow-hidden rounded-xl bg-white/10 border border-white/20 text-amber-100 font-medium tracking-widest uppercase text-sm hover:scale-[1.02] active:scale-95 transition-transform duration-300 group"
                    >
                        {/* Glow effect that slides across */}
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                        {isSubmitting ? 'Đang Gửi...' : 'Gửi Lời Chúc'}
                    </button>
                    {toastMsg && <p className="text-center text-sm text-rose-300 mt-4 animate-pulse">{toastMsg}</p>}
                </form>
            </motion.div>
        </section>

        <style dangerouslySetInnerHTML={{__html: `
            @keyframes shimmer {
                100% { transform: translateX(250%) skewX(-12deg); }
            }
        `}} />
        
        {couple.music_url && <AudioPlayer musicUrl={couple.music_url} delay={couple.music_delay} volume={couple.music_volume} autoplay={couple.music_autoplay} />}
    </div>
  )
}
