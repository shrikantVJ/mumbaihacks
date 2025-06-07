'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    content: "SakriyaBoss has transformed our remote work experience. The AI-driven task management is a game-changer!",
    author: "Priya Sharma",
    role: "Product Manager at TechInnovate",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content: "As a manager, I love how SakriyaBoss helps me keep track of my team's progress without micromanaging.",
    author: "Rahul Verma",
    role: "Team Lead at DataDynamics",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content: "The focus enhancement features have boosted my productivity significantly. Highly recommended!",
    author: "Ananya Patel",
    role: "Software Developer at CodeCrafters",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className=" py-24 sm:py-32" id='solutions'>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hear from Our Satisfied Users
          </p>
        </motion.div>
        <motion.div 
          className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.figure 
                key={index} 
                className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <blockquote className="text-gray-900">
                  <p className="text-lg font-semibold leading-6">{`"${testimonial.content}"`}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <Image
                    className="h-10 w-10 rounded-full bg-gray-50"
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600">{`${testimonial.role}`}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}