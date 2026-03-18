import React from 'react'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type MapBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'map' }>

export const MapBlock: React.FC<MapBlockProps> = ({ 
  title, 
  address, 
  zoom, 
  height,
  eyebrow = 'Our Location',
  locationTitle = 'Visit Us',
  hoursTitle = 'Business Hours',
  hours = 'Mon – Fri: 9:00 AM – 6:00 PM\nSat – Sun: Closed'
}) => {
  const encodedAddress = encodeURIComponent(address)
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodedAddress}&zoom=${zoom || 14}`
  const fallbackSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom || 14}&ie=UTF8&iwloc=&output=embed`
  const finalSrc = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? mapSrc : fallbackSrc

  return (
    <section className="relative w-full py-24 md:py-32 bg-heading overflow-hidden">
      {/* Decorative blur orbs */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6">
        <Reveal>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-1.5 mb-6 text-xs font-bold tracking-[0.25em] uppercase text-primary-light border border-white/10 bg-white/5">
              {eyebrow}
            </span>
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.1]">
                {title}
              </h2>
            )}
          </div>

          {/* Split layout: info + map */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left: Address & Contact Info */}
            <div className="lg:w-1/3 flex flex-col justify-center gap-8">
              {/* Address card */}
              <div className="bg-white/5 border border-white/10 p-8 group hover:bg-primary hover:border-primary/30 transition-all duration-500">
                <div className="w-12 h-12 mb-5 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-6 h-6 text-primary-light group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{locationTitle}</h3>
                <p className="text-sm text-white/60 group-hover:text-white/90 leading-relaxed transition-colors duration-500">
                  {address}
                </p>
              </div>

              {/* Hours card */}
              <div className="bg-white/5 border border-white/10 p-8 group hover:bg-primary hover:border-primary/30 transition-all duration-500">
                <div className="w-12 h-12 mb-5 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-6 h-6 text-primary-light group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{hoursTitle}</h3>
                <div className="text-sm text-white/60 group-hover:text-white/90 leading-relaxed transition-colors duration-500 whitespace-pre-line">
                  {hours}
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="lg:w-2/3">
              <div
                className="w-full overflow-hidden border border-white/10 shadow-2xl"
                style={{ height: height || '480px' }}
              >
                <iframe
                  title={title || 'Map'}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={finalSrc}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

