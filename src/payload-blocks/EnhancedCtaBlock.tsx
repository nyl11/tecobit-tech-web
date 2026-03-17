'use client'
import React from 'react'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type EnhancedCtaBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'enhancedCTA' }>

export const EnhancedCtaBlock: React.FC<EnhancedCtaBlockProps> = ({ 
  title, subtitle, buttonLabel, buttonLink, benefits, stats 
}) => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="bg-primary/5 rounded-[3rem] p-10 md:p-20 text-center border border-primary/10 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-primary/40 rounded-full m-8" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-pink-400/40 rounded-full m-8" />
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-heading leading-tight mb-8">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl text-muted font-sans mb-12 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}

            {buttonLabel && buttonLink && (
              <div className="mb-12">
                <Link 
                  href={buttonLink}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white hover:bg-primary-dark transition-all rounded-full font-medium text-xl shadow-xl hover:-translate-y-1"
                >
                  {buttonLabel}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16">
              {Array.isArray(benefits) && benefits.map((benefit: { label?: string | null; id?: string | null }, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm md:text-base font-medium text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {benefit.label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-primary/10">
              {Array.isArray(stats) && stats.map((stat: { value?: string | null; label?: string | null; id?: string | null }, index: number) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
