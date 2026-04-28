'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { TemplateProps } from './types'
import { supabase } from '@/lib/supabaseClient'
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
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date(dateStr))
}

const formatTime = (timeStr?: string | null) => {
    if (!timeStr) return ''
    // remove seconds if exist (HH:mm:ss -> HH:mm)
    return timeStr.slice(0, 5)
}

export default function MinimalistTemplate({ couple, gallery, wishes, weddingGift, locations }: TemplateProps) {
    const heroImage = gallery?.[0]?.image_url || couple.bride_avatar || couple.groom_avatar || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'

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
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    return (
        <div className="bg-[#FDFBF7] text-gray-800 min-h-screen font-helvetica selection:bg-[#E5DFD3] selection:text-gray-900">
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent" />
                </div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-xl w-full">
                    <p className="font-pattaya text-[#D4C5A9] text-lg mb-8 tracking-widest uppercase drop-shadow-md">
                        Save The Date
                    </p>
                    
                    <div className="flex flex-col items-center justify-center gap-2 mb-8">
                        <h1 className="font-signora text-6xl md:text-8xl text-white leading-none drop-shadow-lg">
                            {couple.bride_name}
                        </h1>
                        <span className="font-['EB_Garamond'] italic text-2xl text-white/80">&amp;</span>
                        <h1 className="font-signora text-6xl md:text-8xl text-white leading-none drop-shadow-lg">
                            {couple.groom_name}
                        </h1>
                    </div>

                    <div className="w-12 h-[1px] bg-white/50 mx-auto mb-8" />

                    <p className="font-helvetica text-white uppercase tracking-[0.3em] text-sm md:text-base font-medium drop-shadow-md">
                        {formatDate(couple.wedding_date)}
                    </p>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent mx-auto" />
                </motion.div>
            </section>

            {/* 2. LỜI NGỎ (INVITATION LETTER) */}
            <section className="py-24 px-6 text-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-2xl mx-auto">
                    <h2 className="font-['EB_Garamond'] text-2xl uppercase tracking-[0.2em] text-gray-800 mb-8">
                        Lời Ngỏ
                    </h2>
                    <p className="font-['Lora'] italic text-gray-600 text-lg md:text-xl leading-relaxed">
                        "{couple.intro_description || 'Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhau nhìn về một hướng. Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi.'}"
                    </p>
                </motion.div>
            </section>

            {/* 3. THÔNG TIN LỄ CƯỚI (EVENT INFO) */}
            <section className="py-24 px-6 bg-[#F9F6F0]">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
                        <h2 className="font-['EB_Garamond'] text-3xl uppercase tracking-widest text-gray-900 mb-4">
                            Sự Kiện
                        </h2>
                        <div className="w-16 h-[1px] bg-[#D4C5A9] mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                        {/* Hairline Divider for Desktop */}
                        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-[1px] bg-gray-200 -translate-x-1/2" />

                        {/* Nhà Gái */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center flex flex-col items-center">
                            <span className="font-uni-chu text-[#BFA054] text-sm tracking-[0.3em] uppercase mb-4">Nhà Gái</span>
                            <h3 className="font-['EB_Garamond'] text-2xl uppercase tracking-widest text-gray-900 mb-6">
                                {locations?.bride_event_title || 'Lễ Vu Quy'}
                            </h3>
                            <div className="font-helvetica text-gray-700 text-sm md:text-base space-y-2 mb-8">
                                <p className="uppercase tracking-wider">{formatDate(locations?.bride_event_date || couple.wedding_date)}</p>
                                <p className="font-medium text-gray-900 text-lg">{formatTime(locations?.bride_event_time || couple.wedding_time)}</p>
                            </div>
                            <div className="font-['Lora'] italic text-gray-600 text-base mb-6">
                                <p className="font-bold text-gray-800 not-italic mb-1">{locations?.bride_location}</p>
                                <p>{locations?.bride_address}</p>
                            </div>
                            {locations?.bride_google_map_embed && (
                                <a href={locations.bride_google_map_embed} target="_blank" rel="noreferrer" className="font-['Lexend'] text-xs uppercase tracking-widest border-b border-gray-400 pb-1 text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-colors">
                                    Bản Đồ Chỉ Đường
                                </a>
                            )}
                        </motion.div>

                        {/* Nhà Trai */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center flex flex-col items-center relative">
                            {/* Mobile Divider */}
                            <div className="md:hidden w-32 h-[1px] bg-gray-200 absolute -top-6 left-1/2 -translate-x-1/2" />
                            
                            <span className="font-uni-chu text-[#BFA054] text-sm tracking-[0.3em] uppercase mb-4">Nhà Trai</span>
                            <h3 className="font-['EB_Garamond'] text-2xl uppercase tracking-widest text-gray-900 mb-6">
                                {locations?.groom_event_title || 'Lễ Thành Hôn'}
                            </h3>
                            <div className="font-helvetica text-gray-700 text-sm md:text-base space-y-2 mb-8">
                                <p className="uppercase tracking-wider">{formatDate(locations?.groom_event_date || couple.wedding_date)}</p>
                                <p className="font-medium text-gray-900 text-lg">{formatTime(locations?.groom_event_time || couple.wedding_time)}</p>
                            </div>
                            <div className="font-['Lora'] italic text-gray-600 text-base mb-6">
                                <p className="font-bold text-gray-800 not-italic mb-1">{locations?.groom_location}</p>
                                <p>{locations?.groom_address}</p>
                            </div>
                            {locations?.groom_google_map_embed && (
                                <a href={locations.groom_google_map_embed} target="_blank" rel="noreferrer" className="font-['Lexend'] text-xs uppercase tracking-widest border-b border-gray-400 pb-1 text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-colors">
                                    Bản Đồ Chỉ Đường
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. GALLERY THƯỜNG TRỌNG */}
            {gallery && gallery.length > 0 && (
                <section className="py-24 px-6 bg-[#FDFBF7]">
                    <div className="max-w-5xl mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
                            <h2 className="font-['EB_Garamond'] text-3xl uppercase tracking-widest text-gray-900 mb-4">
                                Thư Viện Ảnh
                            </h2>
                            <div className="w-16 h-[1px] bg-[#D4C5A9] mx-auto" />
                        </motion.div>

                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {gallery.map((img, idx) => (
                                <motion.div 
                                    key={idx} 
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                    className="break-inside-avoid overflow-hidden rounded-md border border-gray-200"
                                >
                                    <button type="button" onClick={() => setSelectedGalleryIndex(idx)} className="block w-full text-left">
                                        <img src={img.image_url} alt="Gallery" className="w-full h-auto hover:scale-105 transition-transform duration-700" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
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

            {/* 5. HỘP MỪNG CƯỚI (GIFT BOX) */}
            {weddingGift?.is_enabled && (
                <section className="py-24 px-6 bg-[#F9F6F0]">
                    <div className="max-w-4xl mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
                            <h2 className="font-['EB_Garamond'] text-3xl uppercase tracking-widest text-gray-900 mb-4">
                                Hộp Mừng Cưới
                            </h2>
                            <div className="w-16 h-[1px] bg-[#D4C5A9] mx-auto" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                            {weddingGift.bride_bank_name && weddingGift.bride_bank_account && (
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 bg-[#FDFBF7] border border-gray-200 rounded-xl text-center">
                                    <span className="font-uni-chu text-[#BFA054] text-xs tracking-widest uppercase mb-6 block">Nhà Gái</span>
                                    {weddingGift.bride_bank_qr && (
                                        <img src={weddingGift.bride_bank_qr} alt="QR" className="w-32 h-32 mx-auto mix-blend-multiply mb-6" />
                                    )}
                                    <p className="font-helvetica font-medium text-gray-900 mb-2 uppercase tracking-wide">{weddingGift.bride_bank_name}</p>
                                    <p className="font-['Lexend'] text-gray-800 text-lg tracking-wider mb-2">{weddingGift.bride_bank_account}</p>
                                    <p className="font-helvetica text-gray-500 text-sm uppercase tracking-wide">{weddingGift.bride_bank_holder}</p>
                                </motion.div>
                            )}

                            {weddingGift.groom_bank_name && weddingGift.groom_bank_account && (
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 bg-[#FDFBF7] border border-gray-200 rounded-xl text-center">
                                    <span className="font-uni-chu text-[#BFA054] text-xs tracking-widest uppercase mb-6 block">Nhà Trai</span>
                                    {weddingGift.groom_bank_qr && (
                                        <img src={weddingGift.groom_bank_qr} alt="QR" className="w-32 h-32 mx-auto mix-blend-multiply mb-6" />
                                    )}
                                    <p className="font-helvetica font-medium text-gray-900 mb-2 uppercase tracking-wide">{weddingGift.groom_bank_name}</p>
                                    <p className="font-['Lexend'] text-gray-800 text-lg tracking-wider mb-2">{weddingGift.groom_bank_account}</p>
                                    <p className="font-helvetica text-gray-500 text-sm uppercase tracking-wide">{weddingGift.groom_bank_holder}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. RSVP FORM */}
            <section className="py-32 px-6 bg-[#FDFBF7]">
                <div className="max-w-xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
                        <h2 className="font-['EB_Garamond'] text-3xl uppercase tracking-widest text-gray-900 mb-4">
                            Gửi Lời Chúc
                        </h2>
                        <p className="font-['Lora'] italic text-gray-500">
                            Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi.
                        </p>
                    </motion.div>

                    <motion.form 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        onSubmit={handleRSVP} 
                        className="space-y-8"
                    >
                        <div>
                            <input 
                                type="text" 
                                required
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                placeholder="Tên của bạn" 
                                className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 text-gray-800 font-helvetica placeholder-gray-400 focus:ring-0 focus:border-gray-800 transition-colors"
                            />
                        </div>
                        <div>
                            <textarea 
                                required
                                value={formMsg}
                                onChange={(e) => setFormMsg(e.target.value)}
                                rows={4}
                                placeholder="Lời chúc gửi đến cô dâu chú rể..." 
                                className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 text-gray-800 font-helvetica placeholder-gray-400 focus:ring-0 focus:border-gray-800 transition-colors resize-none"
                            />
                        </div>

                        <button 
                            disabled={isSubmitting}
                            type="submit" 
                            className="w-full py-4 bg-slate-800 text-white font-['Lexend'] uppercase tracking-[0.2em] text-sm hover:bg-slate-900 transition-colors duration-300 disabled:bg-slate-400"
                        >
                            {isSubmitting ? 'ĐANG GỬI...' : 'GỬI LỜI CHÚC & XÁC NHẬN'}
                        </button>
                        {toastMsg && <p className="text-center font-helvetica text-sm text-[#BFA054] mt-4">{toastMsg}</p>}
                    </motion.form>
                </div>
            </section>

            {couple.music_url && <AudioPlayer musicUrl={couple.music_url} delay={couple.music_delay} volume={couple.music_volume} autoplay={couple.music_autoplay} />}
        </div>
    )
}
