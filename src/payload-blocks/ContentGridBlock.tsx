import React from 'react'
import { Media } from '@/components/Media'
import type { Page, Media as MediaType } from '@/payload-types'
import { fetchCollection } from '@/utilities/payload-fetch'

type ContentGridBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'contentGrid' }>

interface DisplayItem {
  title: string
  content: string
  icon?: (string | null) | MediaType
}

export const ContentGridBlock = async ({
  title,
  subtitle,
  items: manualItems,
  populateFrom,
  layout = 'grid',
  columns = '3',
  itemStyle = 'card',
}: ContentGridBlockProps) => {
  let displayItems: DisplayItem[] = []

  if (populateFrom === 'services') {
    const { docs: services } = await fetchCollection('services', {
      limit: 100, // Reasonable limit for services
      sort: 'createdAt',
    })

    displayItems = services.map((service) => ({
      title: service.title,
      content: service.shortDescription,
      icon: service.icon,
    }))
  } else {
    displayItems = (manualItems as DisplayItem[]) || []
  }

  const gridCols: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  const selectedGridCols = (columns && gridCols[columns]) || 'md:grid-cols-3'

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading">{title}</h2>}
            {subtitle && <p className="text-lg text-muted mt-4 max-w-2xl mx-auto">{subtitle}</p>}
            {!subtitle && <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />}
          </div>
        )}

        {displayItems && displayItems.length > 0 && (
          <div className={layout === 'grid' ? `grid grid-cols-1 ${selectedGridCols} gap-8` : 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8'}>
            {displayItems.map((item, idx: number) => (
              <div key={idx}>
                {itemStyle === 'card' ? (
                  <div className="bg-surface border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 h-full">
                    {item.icon && (
                      <div className="w-14 h-14 mb-8 rounded-2xl bg-primary-light/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Media resource={item.icon} imgClassName="w-7 h-7 object-contain" />
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-semibold text-heading mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted leading-relaxed">{item.content}</p>
                  </div>
                ) : (
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-bold text-heading mb-1">{item.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
