"use client";

import { contactInfo, footerSections, socials } from '@/lib/constant'
import { Stethoscope } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const Footer = () => {
  return (
    <footer className='bg-[#020617] text-white border-t border-white/10 relative overflow-hidden'>

      {/* glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[120px]"></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>

        {/* TOP */}
        <div className='py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>

            {/* LEFT */}
            <div className='lg:col-span-4'>
              <div className='flex items-center space-x-3 mb-6'>
                
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 
                rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30'>
                  <Stethoscope className='w-6 h-6 text-white' />
                </div>

                <span className="text-2xl font-bold bg-gradient-to-r 
                from-blue-400 via-violet-400 to-cyan-400 
                bg-clip-text text-transparent">
                  PremGanga HealthCare+
                </span>
              </div>

              <p className='text-gray-400 mb-6 text-sm leading-relaxed'>
                Your trusted healthcare partner providing quality medical consultations with certified doctors online, anytime, anywhere.
              </p>

              <div className='space-y-3 mb-6'>
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className='flex items-center space-x-3 text-gray-400'>
                      <IconComponent className="w-4 h-4 text-blue-400" />
                      <span>{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* LINKS */}
            <div className='lg:col-span-8'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                {footerSections.map((section, index) => (
                  <div key={index}>
                    <h3 className='font-semibold text-white mb-4 text-lg'>
                      {section.title}
                    </h3>
                    <ul className='space-y-2'>
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className='text-gray-400 hover:text-blue-400 transition text-sm'
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold text-white">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm mt-1">
                Get health tips and product updates delivered to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-[280px] px-4 py-3 rounded-xl 
                bg-white/5 border border-white/10 text-white placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 
              hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30
              transition-all duration-300 
              px-6 py-3 rounded-xl text-white">
                Subscribe
              </Button>

            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className='py-6 border-t border-white/10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>

            <div className='text-gray-400 text-sm'>
              <p>
                &copy; 2026 PremGanga+, Inc. All rights reserved.
              </p>
            </div>

            <div className='flex items-center space-x-4'>
              <span className='text-gray-400 text-sm'>
                Follow us:
              </span>

              <div className='flex space-x-3'>
                {socials.map(({ name, icon, url }) => {
                  const IconComponent = icon;
                  return (
                    <a
                      key={name}
                      href={url}
                      target='_blank'
                      rel="noopener noreferrer"
                      className='w-9 h-9 bg-white/5 hover:bg-white/10 
                      rounded-full flex items-center justify-center 
                      transition-all duration-300 hover:scale-110'
                    >
                      <IconComponent className='w-4 h-4 text-gray-300' />
                    </a>
                  )
                })}
              </div>

            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer