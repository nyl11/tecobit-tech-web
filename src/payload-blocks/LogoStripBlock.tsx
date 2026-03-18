'use client'
import React from 'react'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type LogoStripBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'logoStrip' }>

export const LogoStripBlock: React.FC<LogoStripBlockProps> = ({ 
  title, subtitle, logos 
}) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Reveal>
            {title && <h2 className="text-3xl font-heading font-bold text-heading mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-muted max-w-2xl mx-auto font-light">{subtitle}</p>}
          </Reveal>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
          {Array.isArray(logos) && logos.map((logo: { image: string | import('@/payload-types').Media; id?: string | null }, index: number) => (
            <Reveal key={index} delay={index * 100}>
              <div className="w-12 h-12 md:w-16 md:h-16 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <Media resource={logo.image} imgClassName="w-full h-full object-contain" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
