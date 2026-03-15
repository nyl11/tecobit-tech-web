import React from 'react'
import { HeroBlock } from './HeroBlock'
import { ContentGridBlock } from './ContentGridBlock'
import { CtaBlock } from './CtaBlock'
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
          case 'cta':
            return <CtaBlock key={index} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
