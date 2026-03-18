import React from 'react'
import { Media } from '@/components/Media'
import type { Page, Media as MediaType } from '@/payload-types'
import { fetchCollection } from '@/utilities/payload-fetch'
import { Reveal } from '@/components/Reveal'
import * as LucideIcons from 'lucide-react'

type ContentGridBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'contentGrid' }>

interface DisplayItem {
  title: string
  content: string
  icon?: (string | null) | MediaType
  lucideIcon?: string | null
}

const IconLoader = ({ iconName, className }: { iconName: string; className?: string }) => {
  const Icon = (LucideIcons as any)[iconName]
  if (!Icon) return null
  return <Icon className={className} strokeWidth={1.5} />
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
      lucideIcon: service.lucideIcon,
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
    <section className="relative py-24 bg-[#1e2f3d] overflow-hidden">
      {/* subtle grid texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
        }}
      />
      {/* top accent line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-linear-to-r from-primary via-primary-light to-primary" />

      <div className="container mx-auto px-4 md:px-6 relative">
        {(title || subtitle) && (
          <Reveal>
            <div className="text-center mb-16">
              {title && (
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">{title}</h2>
              )}
              {subtitle && (
                <p className="text-lg text-white/60 mt-4 max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          </Reveal>
        )}

        {displayItems && displayItems.length > 0 && (
          <div
            className={
              layout === 'grid'
                ? `grid grid-cols-1 ${selectedGridCols} gap-8 justify-items-center`
                : 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 justify-items-center'
            }
          >
            {displayItems.map((item, idx: number) => (
              <Reveal key={idx} delay={idx * 100} className="h-full w-full">
                {itemStyle === 'card' ? (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-10 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:bg-primary hover:border-primary/30 h-full group">
                    {(item.lucideIcon || item.icon) && (
                      <div className="w-20 h-20 mb-8 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                        {item.lucideIcon ? (
                          <IconLoader
                            iconName={item.lucideIcon}
                            className="w-10 h-10 text-primary-light group-hover:text-white transition-colors duration-500"
                          />
                        ) : (
                          <Media
                            resource={item.icon}
                            imgClassName="w-10 h-10 object-contain invert transition-all duration-500"
                          />
                        )}
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-bold text-white mb-4 transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-500">
                      {item.content}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary-light">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
      {/* bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-linear-to-r from-primary via-primary-light to-primary" />
    </section>
  )
}
