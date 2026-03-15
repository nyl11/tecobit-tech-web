import React from 'react'
import { fetchCollection } from '@/utilities/payload-fetch'
import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | Tecobit Technology',
}

export default async function ContactPage() {
  const { docs: services } = await fetchCollection('services', { limit: 100 })

  return (
    <div className="py-24 bg-background min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading">Contact Us</h1>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          <p className="mt-6 text-body text-lg">
            Ready to start your next project? Get in touch with us today.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactForm services={services} />
        </div>
      </div>
    </div>
  )
}
