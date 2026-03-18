/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'

export const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  ctaLabel, 
  ctaLink 
}: any) => {
  const bgUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : backgroundImage

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {bgUrl && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgUrl} 
            alt="Hero Background" 
            fill 
            className="object-cover object-center"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light">
            {subtitle}
          </p>
        )}

        {ctaLabel && ctaLink && (
          <a 
            href={ctaLink}
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-none transition-all duration-300 transform active:scale-95 shadow-md shadow-primary/20"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
