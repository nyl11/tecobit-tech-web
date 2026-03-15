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
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
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
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light animate-fade-in-up animation-delay-200">
            {subtitle}
          </p>
        )}

        {ctaLabel && ctaLink && (
          <a 
            href={ctaLink}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400 shadow-lg shadow-blue-500/30"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
