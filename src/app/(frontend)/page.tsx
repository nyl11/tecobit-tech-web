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
        <div className="flex flex-col items-center justify-center pt-32 pb-20">
          <h1 className="text-3xl font-heading mb-4 text-heading">Welcome to Tecobit</h1>
          <p className="text-body">
            Please create a &quot;home&quot; page in the CMS to see dynamic content here.
          </p>
        </div>
      )}
    </article>
  )
}
