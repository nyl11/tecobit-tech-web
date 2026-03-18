import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/payload-blocks/RenderBlocks'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'pages', limit: 100 })
    return docs
      .filter((doc) => doc.slug !== 'home') // Assume 'home' is on root `/page.tsx`
      .map((doc) => ({ slug: doc.slug }))
  } catch (_error) {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    const page = docs[0]
    return {
      title: page?.title ? `${page.title} | Tecobit Technology` : 'Tecobit Technology',
    }
  } catch (_e) {
    return { title: 'Tecobit Technology' }
  }
}

export default async function DynamicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <article className="min-h-screen">
      <RenderBlocks layout={page.layout} />
    </article>
  )
}
