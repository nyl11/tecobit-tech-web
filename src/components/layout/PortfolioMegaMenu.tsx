'use client'

import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { IconLoader } from '@/components/IconLoader'
import type { Portfolio } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ChevronRight } from 'lucide-react'

interface PortfolioMegaMenuProps {
  portfolio: Portfolio[]
  onClose: () => void
}

export const PortfolioMegaMenu: React.FC<PortfolioMegaMenuProps> = ({
  portfolio,
  onClose,
}) => {
  const featuredProjects = portfolio.slice(0, 3)

  return (
    <div className="py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 mb-6">
        {/* Featured Projects */}
        {featuredProjects.map((item) => {
          const categoryNames = Array.isArray(item.category)
            ? item.category
                .map((c) => (typeof c === 'string' ? '' : c.title))
                .filter(Boolean)
                .join(', ')
            : ''

          return (
            <Link
              key={item.id}
              href={`/portfolio/${item.id}`}
              onClick={onClose}
              className={cn(
                'group flex items-start gap-4 p-4 rounded-lg transition-all duration-200',
                'hover:bg-white/50',
                'focus:outline-none focus:ring-2 focus:ring-primary/50',
              )}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {item.lucideIcon ? (
                  <IconLoader
                    iconName={item.lucideIcon}
                    className="w-6 h-6 text-primary transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <Media
                    resource={item.featuredImage}
                    imgClassName="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {categoryNames && (
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5 block">
                    {categoryNames}
                  </span>
                )}
                <h4 className="text-base font-heading font-semibold text-heading mb-1 group-hover:text-primary transition-colors duration-200">
                  {item.projectName}
                </h4>
                {item.client && <p className="text-sm text-muted">{item.client}</p>}
              </div>
            </Link>
          )
        })}
      </div>

      {/* View All Link */}
      <div className="pt-6 border-t border-border/50">
        <Link
          href="/portfolio"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors group"
        >
          View All Projects
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
