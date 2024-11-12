'use client'
import Image from 'next/image'
import React from 'react'

// Placeholder data for mentors and their fields of expertise
const mentors = [
    { name: 'Leon Cox' },
    { name: 'Lina Tannous' },
    { name: 'Richard Ong' },
    { name: 'Nathan Batchelder' }
]

const fields = [
    { name: 'Expert in Robotics & AI' },
    { name: 'Expert in Cloud Computing' },
    { name: 'Expert in Blockchain' },
    { name: 'Expert in Data Science' }
]

export const Mentors = () => {
    return (
        <section className="container mx-auto px-6 py-12 bg-gray-50">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Mentors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {mentors.map((mentor, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg transform transition duration-500 hover:scale-105"
                    >
                        <Image 
                            src="/static/mentors/IMG_1249.jpg"  // Correct path to the image in the public folder
                            alt={`${mentor.name}`} 
                            width={150} 
                            height={350} 
                            className="rounded-full object-cover"
                        />
                        <h2 className="text-2xl font-semibold mt-4 text-gray-700">{mentor.name}</h2>
                        <p className="text-gray-500 mt-2">{fields[index].name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Mentors;
