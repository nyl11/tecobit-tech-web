'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

type ContactFormProps = {
  services: { title: string; id: string }[]
}

export const ContactForm = ({ services }: ContactFormProps) => {
  const searchParams = useSearchParams()
  const preSelectedService = searchParams.get('service') || ''

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceNeeded: preSelectedService,
    message: '',
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    try {
      setStatus('submitting')
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', serviceNeeded: '', message: '' })
    } catch (_e) {
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-xl border border-border/40 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted/60 text-body'

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-border/30 p-8 md:p-10 shadow-md shadow-slate-900/5"
    >
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 font-medium">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 font-medium">
          Oops! Something went wrong. Please try again later.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-heading mb-1.5" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-1.5" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-heading mb-1.5" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-1.5" htmlFor="serviceNeeded">
            Service Needed
          </label>
          <select
            id="serviceNeeded"
            name="serviceNeeded"
            value={formData.serviceNeeded}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select a service</option>
            {services?.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-heading mb-1.5" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
          placeholder="Message"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full md:w-auto btn-theme active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-sm tracking-wide"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
