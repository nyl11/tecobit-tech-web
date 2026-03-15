/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'

export const ContentGrid = ({ title, items }: any) => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items?.map((item: any, index: number) => {
            const iconUrl = typeof item.icon === 'object' ? item.icon?.url : item.icon

            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 pb-10 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
              >
                {iconUrl && (
                  <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={iconUrl} 
                      alt={item.title || 'Icon'} 
                      width={32} 
                      height={32} 
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.content}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
