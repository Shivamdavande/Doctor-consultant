'use client'
import { faqs } from '@/lib/constant'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-[#020617] relative'>

      <div className='max-w-4xl mx-auto'>

        {/* HEADING */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ LIST */}
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className='bg-white/5 backdrop-blur-xl border border-white/10 
              hover:border-blue-500/40 
              transition-all duration-300'
            >
              <CardContent className='p-0'>

                {/* QUESTION */}
                <button 
                  className='w-full px-6 py-4 text-left flex items-center justify-between 
                  hover:bg-white/5 transition'
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className='text-lg font-medium text-white pr-4'>
                    {faq.question}
                  </span>

                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 
                    ${openFAQ === index ? 'rotate-180 text-blue-400' : ''}`} 
                    fill='none' stroke='currentColor' viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="m19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ANSWER */}
                <div className={`overflow-hidden transition-all duration-300 
                  ${openFAQ === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  
                  <div className='px-6 pb-4'>
                    <p className='text-gray-400 leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>

                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FAQSection