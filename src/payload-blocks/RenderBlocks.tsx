import React from 'react'
import { HeroBlock } from './HeroBlock'
import { ContentGridBlock } from './ContentGridBlock'
import { CtaBlock } from './CtaBlock'
import { CompanyStatsBlock } from './CompanyStatsBlock'
import { MapBlock } from './MapBlock'
import { TeamBlock } from './TeamBlock'
import { PageHeroBlock } from './PageHeroBlock'
import type { Page } from '@/payload-types'

export const RenderBlocks = ({ layout }: { layout: Page['layout'] }) => {
  if (!layout || layout.length === 0) return null

  return (
    <div className="w-full flex flex-col">
      {layout.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={index} {...block} />
          case 'contentGrid':
            return <ContentGridBlock key={index} {...block} />
          case 'stats':
            return <CompanyStatsBlock key={index} {...block} />
          case 'cta':
            return <CtaBlock key={index} {...block} />
          case 'map':
            return <MapBlock key={index} {...block} />
          case 'team':
            return <TeamBlock key={index} {...block} />
          case 'pageHero':
            return <PageHeroBlock key={index} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
