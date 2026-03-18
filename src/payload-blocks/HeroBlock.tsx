'use client'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type HeroBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'hero' }>

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  highlightedTitle,
  subtitle,
  backgroundImage,
  links,
}) => {
  return (
    <section className="relative bg-background pt-24 pb-12 overflow-hidden h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="w-full md:w-3/5">
            <Reveal>
              <h1 className="text-5xl md:text-[80px] font-heading font-bold text-heading leading-[1.05] mb-8">
                {title}
                {highlightedTitle && (
                  <span className="block mt-2 bg-linear-to-r from-emerald-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    {highlightedTitle}
                  </span>
                )}
              </h1>
              {subtitle && (
                <p className="text-xl text-body font-sans leading-relaxed mb-12 max-w-xl opacity-90">
                  {subtitle}
                </p>
              )}

              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  {links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url}
                      className="group flex items-center gap-2 transition-all hover:opacity-70"
                    >
                      <span className="text-sm uppercase tracking-[0.2em] font-bold underline-offset-4 group-hover:underline">
                        {link.label}
                      </span>
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
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-2/5 relative">
            <Reveal delay={200}>
              <div className="relative aspect-square overflow-hidden rounded-br-[80px] shadow-xl border border-border/20 bg-surface">
                <Media
                  resource={backgroundImage}
                  imgClassName="w-full h-full object-cover"
                  priority
                />

                {/* Visual indicator (play-style decor) */}
                <div className="absolute bottom-8 left-8 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group overflow-hidden">
                  <div className="flex gap-1.5 h-4">
                    <div className="w-1.5 h-full bg-white rounded-full"></div>
                    <div className="w-1.5 h-full bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Decorative background elements */}
              <div className="absolute -z-10 -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-60" />
              <div className="absolute -z-10 -bottom-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-40" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
