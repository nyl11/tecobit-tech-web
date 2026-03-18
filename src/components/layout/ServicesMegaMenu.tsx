'use client'

import React from 'react'
import { MegaMenuItem } from './MegaMenuItem'
import type { Service } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface ServicesMegaMenuProps {
  services: Service[]
  onClose: () => void
}

export const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({ services, onClose }) => {
  return (
    <div className="py-10 px-6">
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 mb-8">
        {services.slice(0, 6).map((service) => (
          <MegaMenuItem
            key={service.id}
            href={`/services/${service.slug}`}
            title={service.title}
            description={service.shortDescription}
            icon={service.icon}
            lucideIcon={service.lucideIcon}
            onClick={onClose}
          />
        ))}
      </div>

      {/* View All Link */}
      {services.length > 6 && (
        <div className="pt-6 border-t border-border/50">
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors group"
          >
            View All Services
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  )
}
