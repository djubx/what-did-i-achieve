'use client'

import { useEffect, useState } from 'react'
import { sanityClient } from '@/lib/sanity'
import AmbitionsList from '@/components/AmbitionsList'
import TimeTracker from '@/components/TimeTracker'
import { motion } from 'framer-motion'

export default function SharedDashboard({ params }: { params: { shareableId: string } }) {
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    fetchSharedDashboardData()
  }, [])

  const fetchSharedDashboardData = async () => {
    const data = await sanityClient.fetch(`
      *[_type == "sharedDashboard" && shareableId == $shareableId][0] {
        userId,
        "dashboard": *[_type == "userDashboard" && user._ref == ^.userId][0] {
          ambitions,
          timeTracker,
          todayStartTime
        }
      }
    `, { shareableId: params.shareableId })

    if (data?.dashboard) {
      setDashboardData(data.dashboard)
    }
  }

  if (!dashboardData) {
    return <div>Loading shared dashboard...</div>
  }

  const completedAmbitions = dashboardData.ambitions.filter((a: any) => a.completed).length
  const totalAmbitions = dashboardData.ambitions.length

  return (
    <motion.div 
      className="flex flex-col gap-8 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full bg-white bg-opacity-90 p-6 rounded-xl shadow-lg text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Shared Dashboard</h2>
        <div className="flex justify-center items-center space-x-4">
          <span className="text-4xl font-bold text-indigo-600">
            {completedAmbitions} / {totalAmbitions}
          </span>
        </div>
        <p className="mt-2 text-gray-600">ambitions achieved</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          className="w-full md:w-1/2 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">Daily Ambitions</h2>
          <AmbitionsList 
            ambitions={dashboardData.ambitions} 
            onAmbitionsChange={() => {}}
            onAmbitionCompleted={() => {}}
            readOnly={true}
          />
        </motion.div>
        <motion.div 
          className="w-full md:w-1/2 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TimeTracker 
            dashboardData={dashboardData}
            updateDashboardData={() => {}}
            ambitions={dashboardData.ambitions}
            onAmbitionCompleted={() => {}}
            updateSanityDashboard={() => {}}
            readOnly={true}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}