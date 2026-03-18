import React from 'react'
import { fetchCollection } from '@/utilities/payload-fetch'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import { Media } from '@/components/Media'

export async function generateStaticParams() {
  try {
    const { docs } = await fetchCollection('portfolio', { limit: 100 })
    return docs.map(doc => ({ id: doc.id }))
  } catch (_e) {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const { docs } = await fetchCollection('portfolio', {
      where: { id: { equals: id } },
      limit: 1
    })
    const item = docs[0]
    return {
      title: item?.projectName ? `${item.projectName} | Portfolio` : 'Portfolio Details',
    }
  } catch(_e) {
    return {}
  }
}

import { Reveal } from '@/components/Reveal'

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { docs } = await fetchCollection('portfolio', {
    where: { id: { equals: id } },
    limit: 1
  })

  const item = docs[0]
  if (!item) return notFound()

  const categories = item.category?.map(c => typeof c === 'string' ? '' : c.title).filter(Boolean)

  return (
    <div className="bg-background min-h-screen">
      <div className="py-20 container mx-auto px-6 max-w-5xl">
        
        <Reveal>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-heading mb-6">
              {item.projectName}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-muted font-sans">
              {item.client && (
                <div className="bg-surface border border-border/40 px-5 py-2.5 rounded-none text-xs tracking-wider uppercase font-bold">
                  <span className="text-primary mr-2">Client:</span> 
                  <span className="text-heading">{item.client}</span>
                </div>
              )}
              {categories && categories.length > 0 && (
                <div className="bg-surface border border-border/40 px-5 py-2.5 rounded-none text-xs tracking-wider uppercase font-bold">
                  <span className="text-primary mr-2">Categories:</span> 
                  <span className="text-heading">{categories.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="rounded-xl overflow-hidden mb-16 shadow-lg border border-border/40">
            <Media resource={item.featuredImage} imgClassName="w-full object-cover max-h-[70vh]" priority />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="bg-surface rounded-xl p-8 md:p-12 border border-border/40 shadow-sm max-w-4xl mx-auto">
            <RichText data={item.projectDetails} />
          </div>
        </Reveal>
      </div>
    </div>
  )
}
