'use client'
import React, { useState } from 'react'

type ContactFormProps = {
  services: { title: string; id: string }[]
}

export const ContactForm = ({ services }: ContactFormProps) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', serviceNeeded: '', message: '' })

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
      setFormData({ name: '', email: '', serviceNeeded: '', message: '' })
    } catch (_e) {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={onSubmit} className="bg-surface border border-border rounded-xl p-8 shadow-sm">
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 font-medium">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 font-medium">
          Oops! Something went wrong. Please try again later.
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-heading mb-1" htmlFor="name">Name <span className="text-red-500">*</span></label>
          <input 
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-heading mb-1" htmlFor="email">Email <span className="text-red-500">*</span></label>
          <input 
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-heading mb-1" htmlFor="serviceNeeded">Service Needed</label>
          <select 
            id="serviceNeeded"
            name="serviceNeeded"
            value={formData.serviceNeeded}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
          >
            <option value="">Select a service (optional)</option>
            {services.map(s => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-heading mb-1" htmlFor="message">Message <span className="text-red-500">*</span></label>
          <textarea 
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-y"
            placeholder="Tell us about your project..."
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
