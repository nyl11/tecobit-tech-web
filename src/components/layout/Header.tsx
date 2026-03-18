'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/cn'
import type { SiteSetting, Header as HeaderGlobal, Service, Portfolio } from '@/payload-types'
import { useMegaMenu } from '@/hooks/useMegaMenu'
import { MegaMenuContainer } from './MegaMenuContainer'
import { ServicesMegaMenu } from './ServicesMegaMenu'
import { PortfolioMegaMenu } from './PortfolioMegaMenu'

interface NavLinkWithMegaMenu {
  label: string
  link: string
  hasMegaMenu?: boolean
  megaMenuType?: 'services' | 'portfolio'
}

export const Header = ({
  headerData,
  siteSettings,
  services = [],
  portfolio = [],
}: {
  headerData?: HeaderGlobal | null
  siteSettings?: SiteSetting | null
  services?: Service[]
  portfolio?: Portfolio[]
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const logo = siteSettings?.logo
  const companyName = siteSettings?.companyName || 'Tecobit Technology'

  const { activeMegaMenu, closeMegaMenu, handleMouseEnter, handleMouseLeave, cancelTimeout } =
    useMegaMenu()

  // Enhance nav links with mega menu info
  const enhancedNavLinks: NavLinkWithMegaMenu[] = (headerData?.navLinks || []).map((link) => {
    const label = link.label.toLowerCase()
    if (label.includes('service')) {
      return { ...link, hasMegaMenu: true, megaMenuType: 'services' as const }
    }
    if (label.includes('portfolio')) {
      return { ...link, hasMegaMenu: true, megaMenuType: 'portfolio' as const }
    }
    return { ...link, hasMegaMenu: false }
  })

  const handleNavClick = (link: NavLinkWithMegaMenu) => {
    if (!link.hasMegaMenu) {
      closeMegaMenu()
    }
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300"
        style={{ '--header-height': '80px' } as React.CSSProperties}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group relative z-50"
              onClick={closeMegaMenu}
            >
              {logo ? (
                <div className="relative w-9 h-9 lg:w-10 lg:h-10 overflow-hidden flex items-center justify-center">
                  <Media resource={logo} imgClassName="object-contain" />
                </div>
              ) : (
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg">
                  {companyName.charAt(0)}
                </div>
              )}
              <span className="font-bold text-lg lg:text-xl text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                {companyName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {enhancedNavLinks.map((link, i: number) => {
                if (link.hasMegaMenu && link.megaMenuType) {
                  return (
                    <button
                      key={i}
                      onMouseEnter={() => handleMouseEnter(link.megaMenuType!)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleNavClick(link)}
                      className={cn(
                        'px-5 py-2.5 text-sm font-medium transition-colors duration-300 flex items-center gap-1.5',
                        'hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg',
                        activeMegaMenu === link.megaMenuType ? 'text-primary' : 'text-gray-700',
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-300',
                          activeMegaMenu === link.megaMenuType && 'rotate-180',
                        )}
                      />
                    </button>
                  )
                }

                return (
                  <Link
                    key={i}
                    href={link.link}
                    onClick={() => handleNavClick(link)}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                onClick={closeMegaMenu}
                className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Get a Quote
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen)
                  closeMegaMenu()
                }}
                className="lg:hidden p-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors relative z-50"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menus */}
      <MegaMenuContainer
        isOpen={activeMegaMenu === 'services'}
        onClose={closeMegaMenu}
        onMouseEnter={cancelTimeout}
        onMouseLeave={handleMouseLeave}
      >
        <ServicesMegaMenu services={services} onClose={closeMegaMenu} />
      </MegaMenuContainer>

      <MegaMenuContainer
        isOpen={activeMegaMenu === 'portfolio'}
        onClose={closeMegaMenu}
        onMouseEnter={cancelTimeout}
        onMouseLeave={handleMouseLeave}
      >
        <PortfolioMegaMenu portfolio={portfolio} onClose={closeMegaMenu} />
      </MegaMenuContainer>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-xl transition-all duration-300 z-40 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-2 overflow-y-auto max-h-screen">
          {enhancedNavLinks.map((link, i: number) => (
            <Link
              key={i}
              href={link.link}
              onClick={() => {
                setMobileMenuOpen(false)
                closeMegaMenu()
              }}
              className="px-5 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-5 py-3 text-base font-semibold text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white text-center transition-all duration-300"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </>
  )
}
