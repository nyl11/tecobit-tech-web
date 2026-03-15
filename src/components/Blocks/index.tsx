/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Hero } from './Hero'
import { ContentGrid } from './ContentGrid'
import { CTA } from './CTA'

const blockComponents = {
  hero: Hero,
  contentGrid: ContentGrid,
  cta: CTA,
}

export const RenderBlocks = ({ blocks }: { blocks: any[] }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const { blockType } = block
        const BlockComponent = blockComponents[blockType as keyof typeof blockComponents]

        if (!BlockComponent) {
          console.warn(`No React component found for block type: ${blockType}`)
          return null
        }

        return <BlockComponent key={index} {...block} />
      })}
    </div>
  )
}
