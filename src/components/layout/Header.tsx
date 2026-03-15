import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { SiteSetting, Header as HeaderGlobal } from '@/payload-types'

export const Header = ({ headerData, siteSettings }: { headerData?: HeaderGlobal | null, siteSettings?: SiteSetting | null }) => {
  const logo = siteSettings?.logo
  const companyName = siteSettings?.companyName || 'Tecobit Technology'

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {logo ? (
            <div className="relative w-10 h-10 overflow-hidden rounded-lg flex items-center justify-center group-hover:shadow-sm transition-all">
              <Media resource={logo} imgClassName="object-contain" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-heading font-bold text-xl">
              {companyName.charAt(0)}
            </div>
          )}
          <span className="font-bold font-heading text-xl text-heading tracking-tight group-hover:text-primary transition-colors">
            {companyName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {headerData?.navLinks?.map((link, i: number) => (
            <Link 
              key={i} 
              href={link.link}
              className="text-sm font-medium text-body hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/contact"
            className="hidden lg:flex bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-body">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
