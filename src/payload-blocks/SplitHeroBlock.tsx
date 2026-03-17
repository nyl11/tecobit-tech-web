'use client'
import React from 'react'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'
import Link from 'next/link'

type SplitHeroBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'splitHero' }>

export const SplitHeroBlock: React.FC<SplitHeroBlockProps> = ({ 
  title, subtitle, image, ctaLabel, ctaLink 
}) => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-heading leading-[1.1] mb-6">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xl text-muted font-sans leading-relaxed mb-8 max-w-xl">
                  {subtitle}
                </p>
              )}
              {ctaLabel && ctaLink && (
                <Link 
                  href={ctaLink}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white hover:bg-primary-dark transition-all rounded-full font-medium text-lg shadow-lg hover:-translate-y-1"
                >
                  {ctaLabel}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}
            </Reveal>
          </div>
          <div className="w-full md:w-1/2 relative">
            <Reveal delay={200}>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-surface">
                <Media resource={image} imgClassName="w-full h-auto aspect-[4/3] object-cover" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
