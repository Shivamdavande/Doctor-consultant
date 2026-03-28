"use client"
import { testimonials } from '@/lib/constant'
import React from 'react'
import { Card, CardContent } from '../ui/card'

const TestimonialSection = () => {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-[#020617] relative'>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className='text-center mb-14'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Our Patients Love Us
          </h2>

          <div className='flex items-center justify-center gap-2 mb-4'>
            <span className='text-2xl font-bold text-white'>4.5</span>

            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <span className='text-gray-400'>52k reviews</span>
          </div>
        </div>

        {/* GRID */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {testimonials.map((testimonials, index) => (
            <Card 
              key={index} 
              className='bg-white/5 backdrop-blur-xl border border-white/10 
              hover:border-blue-500/40 
              hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
              transition-all duration-300 group'
            >
              <CardContent className='p-6'>

                {/* STARS */}
                <div className='flex text-yellow-400 mb-3'>
                  {[...Array(testimonials.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* TEXT */}
                <p className='text-sm text-gray-300 mb-6 leading-relaxed'>
                  {testimonials.text}
                </p>

                {/* AUTHOR */}
                <div className='text-sm'>
                  <p className='font-semibold text-white group-hover:text-blue-400 transition'>
                    {testimonials.author}
                  </p>
                  <p className='text-gray-400'>
                    {testimonials.location}
                  </p>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* BUTTON */}
        <div className='text-center mt-10'>
          <button className='text-blue-400 hover:text-blue-300 font-medium transition'>
            Read More
          </button>
        </div>

      </div>
    </section>
  )
}

export default TestimonialSection