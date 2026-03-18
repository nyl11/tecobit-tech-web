'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Media } from './Media'
import type { Page } from '@/payload-types'

type StatItem = Extract<NonNullable<Page['layout']>[0], { blockType: 'stats' }>['stats'][0]

export const StatsSection = ({ stats }: { stats: StatItem[] }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const sortedStats = [...stats].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))

  return (
    <section ref={sectionRef} className="py-16 bg-heading text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {sortedStats.map((stat, idx) => (
            <div
              key={stat.id}
              className="text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              {stat.icon && (
                <div
                  className={`mx-auto w-16 h-16 mb-4 flex items-center justify-center opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <Media
                    resource={stat.icon}
                    imgClassName="w-10 h-10 object-contain filter brightness-0 invert drop-shadow-sm"
                  />
                </div>
              )}
              <div
                className={`text-4xl md:text-5xl font-heading font-bold text-primary mb-2 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${idx * 100 + 100}ms`, animationFillMode: 'forwards' }}
              >
                {stat.value}
              </div>
              <div
                className={`text-surface-alt font-medium uppercase tracking-wider text-sm opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${idx * 100 + 200}ms`, animationFillMode: 'forwards' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
