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
        if(isAuthenticated) {
            router.push('/doctor-list')
        } else {
            router.push('/signup/patient')
        }
    }

    const handleCategoryClick = (categoryTitle: string) => {
        if(isAuthenticated) {
            router.push(`/doctor-list?category=${categoryTitle}`)
        }  else {
            router.push('/signup/patient')
        }
    }

    return (
        <section className='py-20 px-4 bg-gradient-to-b from-blue-50 to-white'>
            <div className='container mx-auto text-center'>
                <h1 className='text-5xl md:text-6xl font-bold text-blue-900 leading-tight mb-6'>
                    The place where <br />
                    <span className='text-blue-900'>
                        doctors listen - to you
                    </span>
                </h1>

                <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                    Online primary care that's affordable with or without insurance.
                </p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
                    <Button
                        onClick={handleBookonsultantion}
                        size="lg"
                        className="bg-blue-600 text-white rounded-full px-8 py-3"
                    >
                        Book a video visit
                    </Button>

                    <Link href="/login/doctor">
                        <Button size="lg" variant="outline">
                            Login as Doctor
                        </Button>
                    </Link>
                </div>

                <section className='py-6'>
                    <div className='flex justify-center gap-6'>
                        {healthcareCategories.map((category) => (
                            <button key={category.id}
                                onClick={() => handleCategoryClick(category.title)}
                                className='flex flex-col items-center'>

                                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                                    <svg className='w-6 h-6 text-white' fill='currentColor'>
                                        <path d={category.icon} />
                                    </svg>
                                </div>

                                <span>{category.title}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}

export default LandingHero;