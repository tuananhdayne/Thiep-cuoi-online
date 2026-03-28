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

export default function RoseTemplate({
    couple,
    gallery,
    wishes,
}: TemplateProps) {
    const heroBackground =
        gallery?.[0]?.image_url ||
        couple.bride_avatar ||
        couple.groom_avatar ||
        '/placeholder.svg?height=1000&width=1000'

    const themeClass = 'theme-rose'

    return (
        <div className={`bg-bg-main text-primary min-h-screen flex flex-col md:flex-row ${themeClass}`}>
            {/* Left side: Sticky Hero */}
            <div className="md:w-1/2 md:sticky md:top-0 h-[50vh] md:h-screen relative overflow-hidden">
                <Image
                    src={heroBackground}
                    alt={`${couple.bride_name} & ${couple.groom_name}`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-8 text-center">
                    <h1 className="font-heading text-5xl md:text-7xl mb-4 italic tracking-wide">
                        {couple.bride_name} <span>&amp;</span> {couple.groom_name}
                    </h1>
                    <p className="font-body text-lg md:text-xl tracking-widest uppercase">
                        {couple.wedding_date}
                    </p>
                </div>
            </div>

            {/* Right side: Scrolling Content */}
            <div className="md:w-1/2 overflow-y-auto">
                <div className="p-8 md:p-16 max-w-3xl mx-auto space-y-24">

                    {/* Intro Section */}
                    <section className="text-center">
                        <h2 className="font-heading text-3xl mb-6 text-accent">We are getting married</h2>
                        <p className="font-body leading-relaxed text-secondary text-lg">
                            {couple.intro_description || "Join us as we celebrate our love and commitment to each other."}
                        </p>
                        {couple.wedding_time && (
                            <p className="mt-4 font-body font-semibold text-primary">
                                {couple.wedding_time}
                            </p>
                        )}
                    </section>

                    <Countdown
                        weddingDate={couple.wedding_date}
                        weddingTime={couple.wedding_time}
                    />

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

                    <Gallery images={gallery || []} />

                    <RsvpSection
                        coupleId={couple.id}
                        brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
                        groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
                    />

                    <WishSection coupleId={couple.id} initialWishes={wishes || []} />

                    <Footer
                        bride={couple.bride_name}
                        groom={couple.groom_name}
                        date={couple.wedding_date}
                    />
                </div>
            </div>

            <AudioPlayer
                musicUrl={couple.music_url}
                delay={couple.music_delay}
                volume={couple.music_volume}
                autoplay={couple.music_autoplay}
            />
        </div>
    )
}
