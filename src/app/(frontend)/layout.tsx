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

  // Using our fetchGlobal helper to fetch using the Payload REST API with Next.js caching
  const headerData = await fetchGlobal('header')
  const footerData = await fetchGlobal('footer')
  const siteSettings = await fetchGlobal('site-settings')

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex flex-col min-h-screen antialiased bg-background text-body font-sans">
        <Header headerData={headerData} siteSettings={siteSettings} />
        <main className="flex-grow">{children}</main>
        <Footer footerData={footerData} siteSettings={siteSettings} />
      </body>
    </html>
  )
}
