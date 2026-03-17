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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', serviceNeeded: preSelectedService, message: '' })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      setStatus('submitting')
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', serviceNeeded: '', message: '' })
    } catch (_e) {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 md:p-10 shadow-xl shadow-slate-200/50">
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 font-medium animate-in fade-in slide-in-from-top-2">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 font-medium animate-in fade-in slide-in-from-top-2">
          Oops! Something went wrong. Please try again later.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">Email</label>
          <input 
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50/50 placeholder:text-slate-400"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">Name</label>
          <input 
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50/50 placeholder:text-slate-400"
            placeholder="Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phone">Phone</label>
          <input 
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50/50 placeholder:text-slate-400"
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="serviceNeeded">Service Needed</label>
          <select 
            id="serviceNeeded"
            name="serviceNeeded"
            value={formData.serviceNeeded}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50/50 text-slate-700"
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
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="message">Message</label>
        <textarea 
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50/50 placeholder:text-slate-400 resize-none"
          placeholder="Message"
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full md:w-auto px-10 py-4 bg-[#0A2647] text-white rounded-lg font-bold hover:bg-[#061B33] transition-all shadow-lg hover:shadow-[#0A2647]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
      >
        {status === 'submitting' ? 'SENDING...' : 'Send Message'}
      </button>
    </form>
  )
}
