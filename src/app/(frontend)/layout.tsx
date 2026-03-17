import React from 'react'
import { Inter, Poppins } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { fetchGlobal } from '@/utilities/payload-fetch'
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

  try {
    const [header, footer, settings] = await Promise.all([
      fetchGlobal('header').catch((err) => {
        console.error('Failed to fetch header:', err)
        return null
      }),
      fetchGlobal('footer').catch((err) => {
        console.error('Failed to fetch footer:', err)
        return null
      }),
      fetchGlobal('site-settings').catch((err) => {
        console.error('Failed to fetch site-settings:', err)
        return null
      }),
    ])
    headerData = header
    footerData = footer
    siteSettings = settings
  } catch (error) {
    console.error('Unexpected error in RootLayout data fetching:', error)
  }

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex flex-col min-h-screen antialiased bg-background text-body font-sans">
        <Header headerData={headerData} siteSettings={siteSettings} />
        <main className="grow">{children}</main>
        <Footer footerData={footerData} siteSettings={siteSettings} />
      </body>
    </html>
  )
}
