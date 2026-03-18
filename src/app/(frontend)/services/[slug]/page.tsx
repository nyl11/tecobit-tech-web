import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'services', limit: 100 })
    return docs.filter((doc) => doc.slug).map((doc) => ({ slug: doc.slug }))
  } catch (_e) {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const service = docs[0]
    return {
      title: service?.title ? `${service.title} | Services` : 'Service Details',
      description: service?.shortDescription,
    }
  } catch (_e) {
    return {}
  }
}

import { Reveal } from '@/components/Reveal'
import { RenderBlocks } from '@/payload-blocks/RenderBlocks'

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const service = docs[0]
  if (!service) return notFound()

  // Use layout blocks if available, otherwise fallback to detailedDescription
  const hasLayout = service.layout && service.layout.length > 0

  return (
    <div className="bg-background">
      {hasLayout ? (
        <RenderBlocks layout={service.layout!} />
      ) : (
        <div className="container mx-auto px-6 max-w-6xl py-24 min-h-screen">
          <Reveal delay={200}>
            <div className="bg-surface rounded-xl p-8 md:p-12 border border-border/40 shadow-sm max-w-4xl mx-auto">
              <RichText data={service.detailedDescription} />
            </div>
          </Reveal>
        </div>
      )}
    </div>
  )
}
