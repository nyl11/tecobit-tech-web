import React from 'react'
import { fetchCollection } from '@/utilities/payload-fetch'
import { RenderBlocks } from '@/payload-blocks/RenderBlocks'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { docs } = await fetchCollection('pages', {
      where: { slug: { equals: 'home' } },
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

export default async function HomePage() {
  const { docs: pages } = await fetchCollection('pages', {
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const page = pages[0]

  return (
    <article className="min-h-screen">
      {page ? (
        <RenderBlocks layout={page.layout} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-heading">Welcome to Tecobit</h1>
            <p className="text-muted font-light leading-relaxed mb-10">
              Your premium digital experience starts here. Please create a &quot;home&quot; page in the CMS to begin showcasing your dynamic content.
            </p>
            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
          </div>
        </div>
      )}
    </article>
  )
}
