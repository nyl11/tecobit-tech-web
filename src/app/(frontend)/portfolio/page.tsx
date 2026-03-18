import React from 'react'
import { fetchCollection } from '@/utilities/payload-fetch'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const metadata = {
  title: 'Portfolio | Tecobit Technology',
}

import { Reveal } from '@/components/Reveal'

export default async function PortfolioPage() {
  const { docs: portfolio } = await fetchCollection('portfolio', { limit: 100 })

  return (
    <div className="bg-background min-h-screen">
      <div className="py-24 container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading">Our Portfolio</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item, index) => {
             const categoryNames = item.category?.map(c => typeof c === 'string' ? '' : c.title).filter(Boolean).join(', ')
             return (
              <Reveal key={item.id} delay={index * 100}>
                <Link 
                  href={`/portfolio/${item.id}`} 
                  className="group relative rounded-xl overflow-hidden bg-surface border border-border block hover:shadow-xl transition-all h-full"
                >
                  <div className="aspect-4/3 w-full relative">
                    <Media 
                      resource={item.featuredImage} 
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  <div className="absolute inset-0 bg-heading/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-primary-light text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                      {categoryNames || 'Project'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-1">
                      {item.projectName}
                    </h2>
                  </div>
                </Link>
              </Reveal>
          )})}
        </div>
      </div>
    </div>
  )
}
