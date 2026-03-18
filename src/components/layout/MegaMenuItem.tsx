'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { IconLoader } from '@/components/IconLoader'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface MegaMenuItemProps {
  href: string
  title: string
  description?: string
  icon?: (string | null) | MediaType
  lucideIcon?: string | null
  onClick?: () => void
  className?: string
}

export const MegaMenuItem: React.FC<MegaMenuItemProps> = ({
  href,
  title,
  description,
  icon,
  lucideIcon,
  onClick,
  className,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group flex items-start gap-4 p-4 rounded-lg transition-all duration-200',
        'hover:bg-surface/50',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        className,
      )}
    >
      {/* Icon */}
      {(lucideIcon || icon) && (
        <div className="flex-shrink-0 mt-0.5">
          {lucideIcon ? (
            <IconLoader
              iconName={lucideIcon}
              className="w-6 h-6 text-primary transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <Media
              resource={icon}
              imgClassName="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-105"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-heading font-semibold text-heading mb-1 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted leading-relaxed line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}
