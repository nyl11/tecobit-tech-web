import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="max-w-2xl">
        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">404 Error</span>
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-heading leading-tight">
          Page Not Found
        </h1>
        <p className="text-body mb-10 text-xl max-w-lg mx-auto leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to another URL. 
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-10 py-4 bg-primary text-white rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95 flex items-center justify-center"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="px-10 py-4 bg-white text-heading border border-border rounded-full font-semibold transition-all hover:bg-muted active:scale-95 flex items-center justify-center"
          >
            Explore Services
          </Link>
        </div>
      </div>
      
      {/* Abstract design elements to make it look premium */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}
