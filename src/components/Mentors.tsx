'use client'
import Image from 'next/image'
import React from 'react'

// Placeholder data for mentors, without an imageUrl property
const mentors = [
    { name: 'Mentor 1' },
    { name: 'Mentor 2' },
    { name: 'Mentor 3' },
    { name: 'Mentor 4' }
]

export const Mentors = () => {
    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Our Mentors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {mentors.map((mentor, index) => (
                    <div key={index} className="text-center space-y-4">
                        <Image 
                            src="/leon.jpg"  // Directly using the path to 'leon.jpg'
                            alt={`${mentor.name}`} 
                            width={150} 
                            height={150} 
                            className="rounded-full object-cover mx-auto"
                        />
                        <h2 className="text-xl font-semibold">{mentor.name}</h2>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Mentors;
