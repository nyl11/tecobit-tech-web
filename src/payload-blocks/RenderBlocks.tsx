import React from 'react'
import { HeroBlock } from './HeroBlock'
import { ContentGridBlock } from './ContentGridBlock'
import { CtaBlock } from './CtaBlock'
import { CompanyStatsBlock } from './CompanyStatsBlock'
import { MapBlock } from './MapBlock'
import { TeamBlock } from './TeamBlock'
import { PageHeroBlock } from './PageHeroBlock'
import { SplitHeroBlock } from './SplitHeroBlock'
import { ProcessBlock } from './ProcessBlock'
import { LogoStripBlock } from './LogoStripBlock'
import { EnhancedCtaBlock } from './EnhancedCtaBlock'
import type { Page } from '@/payload-types'
import { Reveal } from '@/components/Reveal'

export const RenderBlocks = ({ layout }: { layout: Page['layout'] }) => {
  if (!layout || layout.length === 0) return null

  return (
    <div className="w-full flex flex-col">
      {layout.map((block, index) => {
        let blockComponent = null

        switch (block.blockType) {
          case 'hero':
            blockComponent = <HeroBlock {...block} />
            break
          case 'contentGrid':
            blockComponent = <ContentGridBlock {...block} />
            break
          case 'stats':
            blockComponent = <CompanyStatsBlock {...block} />
            break
          case 'cta':
            blockComponent = <CtaBlock {...block} />
            break
          case 'map':
            blockComponent = <MapBlock {...block} />
            break
          case 'team':
            blockComponent = <TeamBlock {...block} />
            break
          case 'pageHero':
            blockComponent = <PageHeroBlock {...block} />
            break
          case 'splitHero':
            blockComponent = <SplitHeroBlock {...block} />
            break
          case 'process':
            blockComponent = <ProcessBlock {...block} />
            break
          case 'logoStrip':
            blockComponent = <LogoStripBlock {...block} />
            break
          case 'enhancedCTA':
            blockComponent = <EnhancedCtaBlock {...block} />
            break
          default:
            blockComponent = null
        }

        if (!blockComponent) return null

        return (
          <React.Fragment key={index}>
            {blockComponent}
          </React.Fragment>
        )
      })}
    </div>
  )
}
