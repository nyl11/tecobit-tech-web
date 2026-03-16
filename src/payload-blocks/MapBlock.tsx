import React from 'react'
import type { Page } from '@/payload-types'

type MapBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'map' }>

export const MapBlock: React.FC<MapBlockProps> = ({ title, address, zoom, height }) => {
  const encodedAddress = encodeURIComponent(address)
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodedAddress}&zoom=${zoom || 14}`

  // If no API key is provided, we can use a simpler iframe approach as a fallback
  // though the embed API is better if a key is available.
  // Fallback to standard embed if no key:
  const fallbackSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom || 14}&ie=UTF8&iwloc=&output=embed`

  const finalSrc = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? mapSrc : fallbackSrc

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-8 text-center">
            {title}
          </h2>
        )}
        <div 
          className="w-full rounded-xl overflow-hidden shadow-lg border border-surface-alt"
          style={{ height: height || '450px' }}
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
    </section>
  )
}
