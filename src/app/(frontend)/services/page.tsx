import React from 'react'
import { fetchCollection } from '@/utilities/payload-fetch'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const metadata = {
  title: 'Our Services | Tecobit Technology',
}

import { Reveal } from '@/components/Reveal'

export default async function ServicesPage() {
  const { docs: services } = await fetchCollection('services', { limit: 100 })

  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading">
              Our Services
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 100}>
              <Link
                href={`/services/${service.slug}`}
                className="bg-surface border border-border rounded-xl p-8 block hover:shadow-lg hover:-translate-y-1 transition-all group h-full"
              >
                <div className="w-16 h-16 mb-6 rounded-2xl bg-primary-light/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Media resource={service.icon} imgClassName="w-8 h-8 object-contain" />
                </div>
                <h2 className="text-xl font-heading font-semibold text-heading mb-4">
                  {service.title}
                </h2>
                <p className="text-body leading-relaxed mb-6">{service.shortDescription}</p>
                <div className="text-primary font-medium flex items-center gap-2 group-hover:text-primary-dark transition-colors">
                  Learn more{' '}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
