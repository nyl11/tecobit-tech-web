import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { SiteSetting, Footer as FooterGlobal } from '@/payload-types'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Globe,
  MessageCircle,
} from 'lucide-react'

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase()
  if (p.includes('facebook')) return <Facebook size={20} />
  if (p.includes('twitter') || p.includes('x')) return <Twitter size={20} />
  if (p.includes('instagram')) return <Instagram size={20} />
  if (p.includes('linkedin')) return <Linkedin size={20} />
  if (p.includes('github')) return <Github size={20} />
  if (p.includes('youtube')) return <Youtube size={20} />
  if (p.includes('whatsapp')) return <MessageCircle size={20} />
  return <Globe size={20} />
}

export const Footer = ({
  footerData,
  siteSettings,
}: {
  footerData?: FooterGlobal | null
  siteSettings?: SiteSetting | null
}) => {
  const logo = siteSettings?.logo
  const companyName = siteSettings?.companyName || 'Tecobit Technology'
  const email = siteSettings?.contactInfo?.email
  const phone = siteSettings?.contactInfo?.phone

  return (
    <footer className="bg-heading pt-16 pb-10 text-muted">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col — logo row is ~40px tall to match the h4 line-height in other cols */}
          <div className="col-span-1 lg:col-span-1 flex flex-col items-start text-left">
            <Link href="/" className="flex items-center gap-3 mb-6 h-[21px]">
              {logo ? (
                <div className="w-8 h-8 overflow-hidden bg-surface p-1 rounded-lg">
                  <Media resource={logo} imgClassName="object-contain" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-heading font-bold text-base">
                  {companyName.charAt(0)}
                </div>
              )}
              <span className="font-bold text-sm text-white tracking-tight font-heading uppercase">
                {companyName}
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed whitespace-pre-line">
              {footerData?.companyDescription ||
                'Delivering innovative tech solutions that drive business transformation and digital success.'}
            </p>
          </div>

          {/* Links Col */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">
              Company
            </h4>
            <ul className="space-y-3">
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
          <div className="flex flex-col items-start text-left">
            <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-primary-light transition-colors"
                  >
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
              <li className="whitespace-pre-line leading-relaxed">
                {footerData?.address || '123 Innovation Drive,\nTech District, 10001'}
              </li>
            </ul>
          </div>

          {/* Social Col */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">
              Follow Us
            </h4>
            <div className="flex gap-3 flex-wrap">
              {footerData?.socialLinks?.map((social, i: number) => (
                <a
                  key={social.id || i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-body/20 flex items-center justify-center hover:bg-primary hover:-translate-y-1 transition-all text-white shadow-sm"
                  title={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-body/20 flex items-center justify-center">
          <p className="text-sm">
            {footerData?.copyright ||
              `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
