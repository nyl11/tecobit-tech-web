import React from 'react'
import { fetchCollection, fetchGlobal } from '@/utilities/payload-fetch'
import { ContactForm } from '@/components/ContactForm'
import { Phone, Mail, MapPin } from 'lucide-react'
import { MapBlock } from '@/payload-blocks/MapBlock'

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
      <section className="relative py-20 md:py-32 bg-[#F4F7F9] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading">
                Contact Us
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
            </div>

            <p className="max-w-2xl mx-auto text-slate-600 text-lg md:text-xl font-light leading-relaxed">
              Have a question or ready to start your next project? Reach out to us and let&apos;s
              build something amazing together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column: Info */}
            <Reveal>
              <div className="ml-10">
                <div className="mb-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-[#0A2647] mb-4">
                    Get In Touch
                  </h2>
                </div>
                <p className="text-slate-500 text-lg mb-12 max-w-md leading-relaxed">
                  We are always open to discuss your projects, improve your online presence or help
                  with your UX/UI design challenges.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#0A2647] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[#0A2647]/20">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A2647] text-lg mb-1">Phone</h3>
                      <p className="text-slate-500 font-medium">{contactInfo?.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#0A2647] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[#0A2647]/20">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A2647] text-lg mb-1">Email</h3>
                      <p className="text-slate-500 font-medium">{contactInfo?.email}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#0A2647] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[#0A2647]/20">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A2647] text-lg mb-1">Address</h3>
                      <p className="text-slate-500 font-medium">{contactInfo?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Form */}
            <Reveal delay={200}>
              <div className="relative">
                <ContactForm services={services} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <Reveal>
        <MapBlock
          address={contactInfo?.address || 'Kathmandu, Nepal'}
          zoom={15}
          height="450px"
          blockType="map"
        />
      </Reveal>
    </div>
  )
}
