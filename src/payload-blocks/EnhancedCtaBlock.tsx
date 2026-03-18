'use client'
import React from 'react'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type EnhancedCtaBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'enhancedCTA' }>

export const EnhancedCtaBlock: React.FC<EnhancedCtaBlockProps> = ({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  benefits,
  stats,
}) => {
  return (
    <section className="relative py-24 px-6 bg-background overflow-hidden">
      {/* diagonal colour sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1e2f3d 0%, #2a4a60 40%, #79a0ba 100%)',
          opacity: 0.97,
        }}
      />
      {/* glowing blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: '#79a0ba' }}
      />

      <div className="container mx-auto max-width-6xl relative">
        <div className="p-10 md:p-20 text-center relative">
          {/* corner dots */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-white/30 rounded-full m-6" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-white/30 rounded-full m-6" />

          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-8">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/70 font-sans mb-12 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}

            {buttonLabel && buttonLink && (
              <div className="mb-12">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-white text-heading hover:bg-white/90 transition-all rounded-none font-bold text-lg shadow-xl active:scale-95"
                >
                  {buttonLabel}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </Reveal>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16">
            {Array.isArray(benefits) &&
              benefits.map(
                (benefit: { label?: string | null; id?: string | null }, index: number) => (
                  <Reveal key={index} delay={400 + index * 100}>
                    <div className="flex items-center gap-2 text-sm md:text-base font-medium text-white/75">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {benefit.label}
                    </div>
                  </Reveal>
                ),
              )}
          </div>

          {Array.isArray(stats) && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
              {stats.map(
                (
                  stat: { value?: string | null; label?: string | null; id?: string | null },
                  index: number,
                ) => (
                  <Reveal key={index} delay={600 + index * 100}>
                    <div>
                      <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-white/50 uppercase tracking-wider font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  </Reveal>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
