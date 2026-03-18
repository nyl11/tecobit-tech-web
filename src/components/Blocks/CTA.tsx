/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const CTA = ({ title, description, buttonLabel, buttonLink }: any) => {
  return (
    <section className="py-24 relative overflow-hidden bg-heading text-white">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/5 rounded-xl p-10 md:p-16 border border-white/10 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{title}</h2>
          
          {description && (
            <p className="text-xl text-surface-alt/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {description}
            </p>
          )}

          <a 
            href={buttonLink}
            className="inline-flex items-center justify-center bg-white text-heading hover:bg-surface-alt font-bold py-4 px-10 rounded-none transition-all duration-300 transform active:scale-95 shadow-lg shadow-white/5"
          >
            {buttonLabel}
            <svg 
              className="w-5 h-5 ml-2 -mr-1" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
