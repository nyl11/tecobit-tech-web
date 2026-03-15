import React from 'react'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'

type ContentGridBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'contentGrid' }>

export const ContentGridBlock = ({ title, items }: ContentGridBlockProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading">
              {title}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>
        )}

        {items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx: number) => (
              <div 
                key={idx} 
                className="bg-surface border border-border rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 group"
              >
                {item.icon && (
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-primary-light/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Media resource={item.icon} imgClassName="w-8 h-8 object-contain" />
                  </div>
                )}
                <h3 className="text-xl font-heading font-semibold text-heading mb-4">
                  {item.title}
                </h3>
                <p className="text-body leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
