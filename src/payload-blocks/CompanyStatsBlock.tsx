import React from 'react'
import type { Page } from '@/payload-types'
import { StatsSection } from '@/components/StatsSection'

type CompanyStatsBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'stats' }>

export const CompanyStatsBlock = ({ title, stats }: CompanyStatsBlockProps) => {
  if (!stats || stats.length === 0) return null

  return (
    <>
      {title && (
        <div className="bg-heading pt-20 pb-10">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{title}</h2>
              <div className="w-24 h-1 bg-primary-light mx-auto mt-6 rounded-full" />
            </div>
          </div>
        </div>
      )}
      <StatsSection stats={stats} />
    </>
  )
}
