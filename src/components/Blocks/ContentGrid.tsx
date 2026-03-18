/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'

export const ContentGrid = ({ title, items }: any) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-6">{title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item: any, index: number) => {
            const iconUrl = typeof item.icon === 'object' ? item.icon?.url : item.icon

            return (
              <div 
                key={index} 
                className="bg-surface rounded-xl p-8 pb-10 shadow-sm border border-border/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                {iconUrl && (
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-white">
                    <Image 
                      src={iconUrl} 
                      alt={item.title || 'Icon'} 
                      width={28} 
                      height={28} 
                      className="object-contain transition-all"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-heading font-bold text-heading mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed font-light">
                  {item.content}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
