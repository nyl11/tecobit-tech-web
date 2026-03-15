import React from 'react'
import { fetchCollection } from '@/utilities/payload-fetch'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import { Media } from '@/components/Media'

export async function generateStaticParams() {
  try {
    const { docs } = await fetchCollection('services', { limit: 100 })
    return docs.filter(doc => doc.slug).map(doc => ({ slug: doc.slug }))
  } catch (_e) {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { docs } = await fetchCollection('services', {
      where: { slug: { equals: slug } },
      limit: 1
    })
    const service = docs[0]
    return {
      title: service?.title ? `${service.title} | Services` : 'Service Details',
      description: service?.shortDescription
    }
  } catch(_e) {
    return {}
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { docs } = await fetchCollection('services', {
    where: { slug: { equals: slug } },
    limit: 1
  })

  const service = docs[0]
  if (!service) return notFound()

  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
          <div className="w-24 h-24 shrink-0 rounded-2xl bg-surface border border-border flex items-center justify-center p-4 shadow-sm">
            <Media resource={service.icon} imgClassName="w-full h-full object-contain" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-muted font-sans leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-sm">
          <RichText data={service.detailedDescription} />
        </div>
      </div>
    </div>
  )
}
