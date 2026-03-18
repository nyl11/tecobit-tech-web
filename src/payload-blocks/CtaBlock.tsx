import React from 'react'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type CtaBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'cta' }>

export const CtaBlock = ({ title, description, buttonLabel, buttonLink }: CtaBlockProps) => {
  return (
    <section className="relative overflow-hidden py-28 md:py-36 bg-linear-to-br from-background via-white to-background">
      {/* Decorative blur orbs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #79a0ba 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Diagonal decorative line */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] border border-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
        <Reveal>
          {/* Eyebrow badge */}
          <span className="inline-block px-5 py-1.5 mb-8 text-xs font-bold tracking-[0.25em] uppercase text-primary border border-primary/20 backdrop-blur-sm">
            Let&apos;s Work Together
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-heading leading-[1.1] mb-8">
            {title}
          </h2>

          {description && (
            <p className="text-lg md:text-xl text-body font-sans leading-relaxed mb-12 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          <div className="flex justify-center">
            <Link
              href={buttonLink}
              className="group px-10 py-4 bg-heading text-white border-2 border-heading font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-transparent hover:text-heading active:scale-95"
            >
              <span className="text-sm uppercase tracking-[0.2em] font-bold">{buttonLabel}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
