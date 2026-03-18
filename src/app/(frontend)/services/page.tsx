import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const metadata = {
  title: 'Our Services | Tecobit Technology',
}

import { Reveal } from '@/components/Reveal'

export default async function ServicesPage() {
  const payload = await getPayload({ config })
  const { docs: services } = await payload.find({ collection: 'services', limit: 100 })

  return (
    <div className="bg-background min-h-screen">
      <div className="py-24 container mx-auto px-6">
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
                <div className="w-14 h-14 mb-6 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <Media
                    resource={service.icon}
                    imgClassName="w-7 h-7 object-contain transition-all group-hover:brightness-0 group-hover:invert"
                  />
                </div>
                <h2 className="text-xl font-heading font-bold text-heading mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="text-muted leading-relaxed mb-6 font-light">
                  {service.shortDescription}
                </p>
                <div className="text-primary font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-all">
                  View Detail <span className="">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
