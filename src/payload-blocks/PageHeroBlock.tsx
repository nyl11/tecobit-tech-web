import React from 'react'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type PageHeroProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'pageHero' }>

export const PageHeroBlock: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  theme = 'slate',
  align = 'center',
  showBlur = true,
}) => {
  const isCentered = align === 'center'

  const themeClasses: Record<'slate' | 'white' | 'light', string> = {
    slate: 'bg-heading text-white',
    white: 'bg-white text-heading',
    light: 'bg-surface-alt/30 text-heading',
  }

  return (
    <section
      className={`relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 ${themeClasses[theme || 'slate']}`}
    >
      {/* Decorative Blur Element */}
      {showBlur && (
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="container relative z-10 px-6 mx-auto">
        <Reveal>
          <div className={`max-w-4xl ${isCentered ? 'mx-auto text-center' : 'text-left'}`}>
            {/* Eyebrow / Badge */}
            {eyebrow && (
              <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] uppercase text-primary-light rounded-none shadow-none shadow-primary/10">
                {eyebrow}
              </span>
            )}

            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-[1.1] mb-8 ${
                theme === 'slate' ? 'text-white' : 'text-heading'
              }`}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className={`text-lg md:text-xl leading-relaxed max-w-2xl ${
                  isCentered ? 'mx-auto' : ''
                } ${theme === 'slate' ? 'text-surface-alt/90' : 'text-body'}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>
      </div>

      {/* Optional: Add a subtle grid pattern for 'light' theme */}
      {theme === 'light' && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-50" />
      )}
    </section>
  )
}
