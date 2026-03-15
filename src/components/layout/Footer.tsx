import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { SiteSetting, Footer as FooterGlobal } from '@/payload-types'

export const Footer = ({ footerData, siteSettings }: { footerData?: FooterGlobal | null, siteSettings?: SiteSetting | null }) => {
  const logo = siteSettings?.logo
  const companyName = siteSettings?.companyName || 'Tecobit Technology'
  const email = siteSettings?.contactInfo?.email
  const phone = siteSettings?.contactInfo?.phone

  return (
    <footer className="bg-heading pt-20 pb-10 text-muted">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              {logo ? (
                <div className="w-10 h-10 overflow-hidden bg-surface p-1 rounded-lg">
                  <Media resource={logo} imgClassName="object-contain" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-heading font-bold text-xl">
                  {companyName.charAt(0)}
                </div>
              )}
              <span className="font-bold text-xl text-white tracking-tight font-heading">
                {companyName}
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6 whitespace-pre-line">
              {footerData?.companyDescription || 'Delivering innovative tech solutions that drive business transformation and digital success.'}
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              {footerData?.navLinks?.map((link, i: number) => (
                <li key={i}>
                  <Link 
                    href={link.link}
                    className="text-muted hover:text-white hover:translate-x-1 inline-block transition-all text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-primary-light transition-colors">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="hover:text-primary-light transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              <li className="whitespace-pre-line">
                {footerData?.address || '123 Innovation Drive,\nTech District, 10001'}
              </li>
            </ul>
          </div>

          {/* Social Col */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4">
              {footerData?.socialLinks?.map((social, i: number) => (
                <a 
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-body/30 flex items-center justify-center hover:bg-primary-dark hover:-translate-y-1 transition-all text-white"
                  title={social.platform}
                >
                  <span className="text-xs font-medium">{social.platform.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-body/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            {footerData?.copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
          </p>
          <div className="text-sm">
            Designed with <span className="text-primary-light">♥</span> using Payload CMS & Next.js
          </div>
        </div>
      </div>
    </footer>
  )
}
