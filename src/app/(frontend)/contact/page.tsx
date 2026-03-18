import React from 'react'
import { fetchCollection, fetchGlobal } from '@/utilities/payload-fetch'
import { ContactForm } from '@/components/ContactForm'
import { Phone, Mail, MapPin } from 'lucide-react'
import { MapBlock } from '@/payload-blocks/MapBlock'
import { Suspense } from 'react'

export const metadata = {
  title: 'Contact Us | Tecobit Technology',
}

import { Reveal } from '@/components/Reveal'

export default async function ContactPage() {
  const { docs: services } = await fetchCollection('services', { limit: 100 })
  const settings = await fetchGlobal('site-settings')
  const { contactInfo, socialLinks: _socialLinks } = settings || {}

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-background overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading">
                Contact Us
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
            </div>

            <p className="max-w-2xl mx-auto text-body text-lg md:text-xl font-light leading-relaxed">
              Have a question or ready to start your next project? Reach out to us and let&apos;s
              build something amazing together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Info */}
            <Reveal>
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">Get In Touch</h2>
                </div>
                <p className="text-muted text-lg mb-12 max-w-md leading-relaxed">
                  We are always open to discuss your projects, improve your online presence or help
                  with your UX/UI design challenges.
                </p>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4 group p-4 rounded-xl bg-background/60 border border-border/20 hover:border-primary/30 hover:shadow-sm transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-primary/20">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading text-base mb-0.5">Phone</h3>
                      <p className="text-muted font-medium text-sm">{contactInfo?.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group p-4 rounded-xl bg-background/60 border border-border/20 hover:border-primary/30 hover:shadow-sm transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-primary/20">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading text-base mb-0.5">Email</h3>
                      <p className="text-muted font-medium text-sm">{contactInfo?.email}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 group p-4 rounded-xl bg-background/60 border border-border/20 hover:border-primary/30 hover:shadow-sm transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-primary/20">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading text-base mb-0.5">Address</h3>
                      <p className="text-muted font-medium text-sm">{contactInfo?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Form */}
            <Reveal delay={200}>
              <div className="relative">
                <Suspense fallback={<div className="h-[400px] w-full animate-pulse bg-slate-100 rounded-xl" />}>
                  <ContactForm services={services} />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapBlock
        title="Our Location"
        address={contactInfo?.address || 'Kathmandu, Nepal'}
        zoom={15}
        height="450px"
        blockType="map"
      />
    </div>
  )
}
