import React from 'react'
import { Inter, Poppins } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Service, Portfolio } from '@/payload-types'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  description: 'Elite IT agency specializing in Web and Mobile development.',
  title: 'Tecobit Technology',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Robust data fetching with fallbacks to ensure the site shell renders even if CMS is offline
  let headerData = null
  let footerData = null
  let siteSettings = null
  let services: Service[] = []
  let portfolio: Portfolio[] = []

  try {
    const payload = await getPayload({ config })
    const [header, footer, settings, servicesResult, portfolioResult] = await Promise.all([
      payload
        .findGlobal({
          slug: 'header',
        })
        .catch((err) => {
          console.error('Failed to fetch header:', err)
          return null
        }),
      payload
        .findGlobal({
          slug: 'footer',
        })
        .catch((err) => {
          console.error('Failed to fetch footer:', err)
          return null
        }),
      payload
        .findGlobal({
          slug: 'site-settings',
        })
        .catch((err) => {
          console.error('Failed to fetch site-settings:', err)
          return null
        }),
      payload
        .find({
          collection: 'services',
          limit: 20,
          sort: 'title',
          depth: 1,
        })
        .catch((err) => {
          console.error('Failed to fetch services:', err)
          return { docs: [] }
        }),
      payload
        .find({
          collection: 'portfolio',
          limit: 12,
          sort: '-createdAt',
          depth: 2,
        })
        .catch((err) => {
          console.error('Failed to fetch portfolio:', err)
          return { docs: [] }
        }),
    ])

    headerData = header
    footerData = footer
    siteSettings = settings
    services = servicesResult.docs
    portfolio = portfolioResult.docs
  } catch (error) {
    console.error('Unexpected error in RootLayout data fetching:', error)
  }

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex flex-col min-h-screen antialiased bg-background text-body font-sans">
        <Header
          headerData={headerData}
          siteSettings={siteSettings}
          services={services}
          portfolio={portfolio}
        />
        <main className="grow">{children}</main>
        <Footer footerData={footerData} siteSettings={siteSettings} />
      </body>
    </html>
  )
}
