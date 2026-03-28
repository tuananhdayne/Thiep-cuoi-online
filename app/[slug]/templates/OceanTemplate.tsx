import React from 'react'
import Image from 'next/image'
import Gallery from '../components/Gallery'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import Countdown from '../components/Countdown'
import WishSection from '../components/WishSection'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'
import { TemplateProps } from './types'

export default function OceanTemplate({
    couple,
    gallery,
    wishes,
}: TemplateProps) {
    const heroBackground =
        gallery?.[0]?.image_url ||
        couple.bride_avatar ||
        couple.groom_avatar ||
        '/placeholder.svg?height=1000&width=1000'

    const themeClass = 'theme-ocean'

    return (
        <div className={`bg-bg-main text-primary min-h-screen ${themeClass}`}>
            {/* Wave Header / Hero */}
            <header className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <Image
                    src={heroBackground}
                    alt={`${couple.bride_name} & ${couple.groom_name}`}
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-main/90" />

                <div className="relative z-10 text-center px-4 pt-20">
                    <p className="font-body text-accent tracking-[0.3em] uppercase text-sm mb-4">
                        Theo dòng hải lưu tình yêu
                    </p>
                    <h1 className="font-heading text-6xl md:text-8xl mb-6 text-primary drop-shadow-md">
                        {couple.bride_name}
                        <span className="block text-4xl my-2 text-accent">&amp;</span>
                        {couple.groom_name}
                    </h1>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6 opacity-60"></div>
                    <p className="font-body text-xl md:text-2xl text-secondary">
                        {couple.wedding_date}
                    </p>
                </div>
            </header>

            {/* Main Content with centered layout */}
            <main className="max-w-4xl mx-auto px-4 py-16 space-y-32">
                <section className="text-center bg-white/50 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-xl shadow-accent/5 border border-white">
                    <h2 className="font-heading text-4xl mb-6 text-primary">Lời ngỏ</h2>
                    <p className="font-body leading-relaxed text-secondary text-lg max-w-2xl mx-auto">
                        {couple.intro_description || "Biển rộng lớn như tình yêu chúng mình. Cùng đến chung vui trong ngày trọng đại nhé!"}
                    </p>
                    {couple.wedding_time && (
                        <p className="mt-8 font-body font-bold text-accent text-xl">
                            {couple.wedding_time}
                        </p>
                    )}
                </section>

                <div className="relative">
                    <Countdown
                        weddingDate={couple.wedding_date}
                        weddingTime={couple.wedding_time}
                    />
                </div>

                <LocationSection
                    weddingDate={couple.wedding_date}
                    weddingTime={couple.wedding_time}
                    brideInfo={{
                        title: couple.bride_event_title,
                        location: couple.bride_location,
                        address: couple.bride_address,
                        mapEmbedUrl: couple.bride_google_map_embed,
                    }}
                    groomInfo={{
                        title: couple.groom_event_title,
                        location: couple.groom_location,
                        address: couple.groom_address,
                        mapEmbedUrl: couple.groom_google_map_embed,
                    }}
                />

                <div className="bg-white/40 p-6 md:p-12 rounded-[3rem]">
                    <Gallery images={gallery || []} />
                </div>

                <RsvpSection
                    coupleId={couple.id}
                    brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
                    groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
                />

                <WishSection coupleId={couple.id} initialWishes={wishes || []} />
            </main>

            <Footer
                bride={couple.bride_name}
                groom={couple.groom_name}
                date={couple.wedding_date}
            />

            <AudioPlayer
                musicUrl={couple.music_url}
                delay={couple.music_delay}
                volume={couple.music_volume}
                autoplay={couple.music_autoplay}
            />
        </div>
    )
}
