'use client'

import Link from 'next/link'
import { FaFlag, FaChartLine, FaBullhorn, FaRocket, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden relative">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["30%", "30%", "50%", "50%", "30%"],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 180, 180, 0, 0],
            borderRadius: ["30%", "30%", "50%", "50%", "30%"],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <header className="bg-white bg-opacity-90 shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold text-indigo-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ambition Tracker
          </motion.h1>
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden sm:block"
            >
              <Link href="/auth/signin" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                Sign In / Sign Up
              </Link>
            </motion.div>
            <button 
              className="sm:hidden ml-4 text-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-white shadow-md py-4 px-6 absolute top-16 left-0 right-0 z-40"
          >
            <Link 
              href="/auth/signin" 
              className="block text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In / Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 relative z-10">
        <motion.section 
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">Track Your Goals, Achieve Your Dreams</h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">Ambition Tracker helps you set, monitor, and accomplish your personal and professional goals.</p>
          <Link href="/auth/signin" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-lg sm:text-xl transition duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center w-full sm:w-auto justify-center">
            Get Started
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.section>

        <motion.section 
          className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            { title: 'Set Goals', description: 'Define clear, actionable goals for your personal and professional life.', icon: FaFlag },
            { title: 'Track Progress', description: 'Monitor your advancement with intuitive charts and progress indicators.', icon: FaChartLine },
            { title: 'Stay Motivated', description: 'Receive reminders and encouragement to keep you on track towards success.', icon: FaBullhorn },
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white bg-opacity-80 p-6 sm:p-8 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
              whileHover={{ y: -5 }}
            >
              <feature.icon className="text-3xl sm:text-4xl text-indigo-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-base sm:text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">Ready to Turn Your Ambitions into Reality?</h2>
          <Link href="/auth/signin" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-lg sm:text-xl transition duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center">
            Join Ambition Tracker Today
            <FaRocket className="ml-2" />
          </Link>
        </motion.section>
      </div>
    </main>
  )
}
