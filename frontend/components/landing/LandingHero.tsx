"use client";

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { healthcareCategories } from '@/lib/constant'
import { useRouter } from 'next/navigation'

const LandingHero = () => {

    const isAuthenticated = false;
    const router = useRouter();

    const handleBookonsultantion = () => {
        if (isAuthenticated) {
            router.push('/doctor-list')
        } else {
            router.push('/signup/patient')
        }
    }

    const handleCategoryClick = (categoryTitle: string) => {
        if (isAuthenticated) {
            router.push(`/doctor-list?category=${categoryTitle}`)
        } else {
            router.push('/signup/patient')
        }
    }

    return (
        <section className='py-24 px-4 bg-[#020617] relative overflow-hidden'>

            {/* GLOBAL STYLE GLOW (subtle, not heavy) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] 
    bg-blue-500/20 blur-[120px]"></div>

            <div className='container mx-auto text-center relative z-10'>

                {/* HEADING */}
                <h1 className='text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6'>
                    The place where <br />
                    <span className='bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent'>
                        doctors listen - to you
                    </span>
                </h1>

                {/* SUBTEXT */}
                <p className='text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto'>
                    Online primary care that's affordable with or without insurance.
                </p>

                {/* BUTTONS */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center mb-14'>

                    <Button
                        onClick={handleBookonsultantion}
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-violet-500 text-white 
                rounded-xl px-8 py-3 shadow-lg shadow-blue-500/20
                hover:scale-105 hover:shadow-blue-500/40
                transition-all duration-300"
                    >
                        Book a video visit
                    </Button>

                    <Link href="/login/doctor">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-xl px-8 py-3 border-white/20 text-gray-300 
                    hover:bg-white/10 hover:text-white
                    transition-all duration-300"
                        >
                            Login as Doctor
                        </Button>
                    </Link>
                </div>

                {/* CATEGORY */}
                <div className='flex flex-wrap justify-center gap-6'>

                    {healthcareCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.title)}
                            className='flex flex-col items-center group transition-all duration-300 hover:-translate-y-2'
                        >

                            {/* ICON BOX */}
                            <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center
                    shadow-md group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] 
                    group-hover:scale-110 transition-all duration-300`}>

                                <svg className='w-6 h-6 text-white'>
                                    <path d={category.icon} />
                                </svg>
                            </div>

                            {/* TEXT */}
                            <span className='mt-2 text-sm font-medium text-gray-400 
                    group-hover:text-blue-400 transition'>
                                {category.title}
                            </span>

                        </button>
                    ))}

                </div>

            </div>
        </section>
    )
}

export default LandingHero;