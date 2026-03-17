import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'

type HeroBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'hero' }>

export const HeroBlock: React.FC<HeroBlockProps> = ({ 
  title, subtitle, backgroundImage, ctaLabel, ctaLink 
}) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Media 
          resource={backgroundImage} 
          imgClassName="w-full h-full object-cover"
          priority 
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-heading/60 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-24 pb-12">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-surface-alt font-sans leading-relaxed mb-10 opacity-90">
            {subtitle}
          </p>
        )}
        {ctaLabel && ctaLink && (
          <div className="flex justify-center gap-4">
            <Link 
              href={ctaLink} 
              className="px-8 py-3.5 bg-primary text-white hover:bg-primary-dark transition-all rounded-lg font-medium text-lg shadow-lg hover:-translate-y-1"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
