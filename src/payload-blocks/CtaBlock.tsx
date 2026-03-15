import React from 'react'
import Link from 'next/link'
import type { Page } from '@/payload-types'

type CtaBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'cta' }>

export const CtaBlock = ({ title, description, buttonLabel, buttonLink }: CtaBlockProps) => {
  return (
    <section className="py-24 bg-surface-alt">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-6">{title}</h2>
        {description && (
          <p className="text-lg md:text-xl text-body mb-10 leading-relaxed font-sans">
            {description}
          </p>
        )}
        <div className="flex justify-center">
          <Link 
            href={buttonLink} 
            className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
