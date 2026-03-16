import React from 'react'
import type { Page } from '@/payload-types'

type CompanyStatsBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'stats' }>

export const CompanyStatsBlock = ({ title, stats }: CompanyStatsBlockProps) => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-6">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading">{title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-body font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
