'use client'
import React from 'react'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

type ProcessBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'process' }>

export const ProcessBlock: React.FC<ProcessBlockProps> = ({ 
  title, subtitle, image, steps 
}) => {
  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          <div className="w-full md:w-1/2">
            <div className="sticky top-24">
              <Reveal>
                <h2 className="text-4xl font-heading font-bold text-heading mb-6">{title}</h2>
                {subtitle && (
                  <p className="text-lg text-muted mb-10 max-w-lg">
                    {subtitle}
                  </p>
                )}
              </Reveal>
              
              <div className="space-y-8">
                {Array.isArray(steps) && steps.map((step: { title: string; content: string; icon?: string | import('@/payload-types').Media | null; id?: string | null }, index: number) => (
                  <Reveal key={index} delay={index * 100}>
                    <div className="flex gap-6 group">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-background border border-border/40 shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {step.icon ? (
                          <Media resource={step.icon} imgClassName="w-6 h-6 object-contain" />
                        ) : (
                          <span className="font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-body leading-relaxed">{step.content}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Reveal delay={300}>
              <div className="rounded-xl overflow-hidden shadow-lg border border-border/30 bg-surface aspect-4/5 relative">
                <Media resource={image} imgClassName="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
