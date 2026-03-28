import React from 'react'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import Countdown from '../components/Countdown'
import WishSection from '../components/WishSection'
import PetalEffect from '../components/PetalEffect'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'
import { TemplateProps } from './types'

export default function ClassicTemplate({
    couple,
    gallery,
    wishes,
}: TemplateProps) {
    const heroBackground =
        gallery?.[0]?.image_url ||
        couple.bride_avatar ||
        couple.groom_avatar ||
        undefined

    const themeClass =
        couple.theme && couple.theme !== 'classic' ? `theme-${couple.theme}` : 'theme-classic'

    return (
        <div className={`bg-bg-main text-primary overflow-hidden ${themeClass}`}>
            <PetalEffect />

            <Hero
                brideName={couple.bride_name}
                groomName={couple.groom_name}
                introDescription={couple.intro_description}
                weddingDate={couple.wedding_date}
                weddingTime={couple.wedding_time}
                backgroundImage={heroBackground}
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

            <Countdown
                weddingDate={couple.wedding_date}
                weddingTime={couple.wedding_time}
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

            <AudioPlayer
                musicUrl={couple.music_url}
                delay={couple.music_delay}
                volume={couple.music_volume}
                autoplay={couple.music_autoplay}
            />
        </div>
    )
}
