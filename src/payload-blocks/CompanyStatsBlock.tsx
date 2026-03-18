import React from 'react'
import type { Page } from '@/payload-types'
import { StatsSection } from '@/components/StatsSection'
import { Reveal } from '@/components/Reveal'

type CompanyStatsBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'stats' }>

export const CompanyStatsBlock = ({ title, stats }: CompanyStatsBlockProps) => {
  if (!stats || stats.length === 0) return null

  return (
    <>
      {title && (
        <div className="bg-heading py-16">
          <div className="container mx-auto px-6">
            <Reveal>
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">{title}</h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
              </div>
            </Reveal>
          </div>
        </div>
      )}
      <StatsSection stats={stats} />
    </>
  )
}
