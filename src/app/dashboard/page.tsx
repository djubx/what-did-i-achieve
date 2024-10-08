'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { sanityClient } from '@/lib/sanity'
import TimeTracker, { TimeSlot } from '@/components/TimeTracker'
import AmbitionsList from '@/components/AmbitionsList'
import { motion } from 'framer-motion'
import { FaPlus, FaCheckCircle, FaHourglassHalf, FaShare } from 'react-icons/fa'

interface Ambition {
  _key: string;
  id: string;
  text: string;
  completed: boolean;
  color: string;
}

const lightColors = [
  '#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFDFBA', '#E0BBE4',
  '#D4F0F0', '#FFC6FF', '#DAEAF6', '#FCE1E4', '#E8DAEF', '#D5F5E3'
];

export default function Dashboard() {
  const { data: session } = useSession()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [ambitions, setAmbitions] = useState<Ambition[]>([]);
  const [newAmbition, setNewAmbition] = useState('');
  const [usedColors, setUsedColors] = useState<string[]>([]);
  const [shareableLink, setShareableLink] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    if (session?.user?.id) {
      const data = await sanityClient.fetch(`
        *[_type == "userDashboard" && user._ref == $userId][0]
      `, { userId: session.user.id })
      setDashboardData(data)
      if (data?.ambitions) {
        setAmbitions(data.ambitions)
      }
    }
  }

  const updateDashboardData = async (newData: any) => {
    const response = await fetch('/api/dashboard/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })

    if (response.ok) {
      fetchDashboardData()
    } else {
      console.error('Failed to update dashboard data')
    }
  }

  const getUniqueColor = useCallback(() => {
    const availableColors = lightColors.filter(color => !usedColors.includes(color));
    if (availableColors.length === 0) {
      setUsedColors([]);
      return lightColors[0];
    }
    const newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    setUsedColors(prevUsedColors => [...prevUsedColors, newColor]);
    return newColor;
  }, [usedColors]);

  const handleAmbitionsChange = (newAmbitions: Ambition[]) => {
    setAmbitions(newAmbitions);
    updateSanityDashboard(newAmbitions);
  };

  const handleAmbitionCompleted = (id: string, completed: boolean) => {
    const newAmbitions = ambitions.map(ambition => 
      ambition.id === id ? { ...ambition, completed } : ambition
    );
    setAmbitions(newAmbitions);
    updateSanityDashboard(newAmbitions);
  };

  const handleAddAmbition = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAmbition.trim()) {
      const ambitionList = newAmbition.split(',').map(item => item.trim()).filter(item => item !== '');
      const newAmbitions = [
        ...ambitions,
        ...ambitionList.map(text => ({
          _key: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          text,
          completed: false,
          color: getUniqueColor()
        }))
      ];
      setAmbitions(newAmbitions);
      setNewAmbition('');
      updateSanityDashboard(newAmbitions);
    }
  };

  const updateSanityDashboard = async (newAmbitions: Ambition[], newTimeSlots?: TimeSlot[], newStartTime?: Date) => {
    if (session?.user?.id) {
      const updatedData = {
        _type: 'userDashboard',
        user: {
          _type: 'reference',
          _ref: session.user.id,
        },
        ambitions: newAmbitions,
        timeTracker: newTimeSlots || dashboardData?.timeTracker || [],
        todayStartTime: newStartTime?.toISOString() || dashboardData?.todayStartTime || new Date().toISOString(),
      };
      await updateDashboardData(updatedData);
    }
  };

  const completedAmbitions = ambitions.filter(a => a.completed).length
  const totalAmbitions = ambitions.length

  const generateShareableLink = useCallback(async () => {
    if (session?.user?.id) {
      const response = await fetch('/api/dashboard/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id }),
      })

      if (response.ok) {
        const { shareableId } = await response.json()
        const link = `${window.location.origin}/shared-dashboard/${shareableId}`
        setShareableLink(link)
        navigator.clipboard.writeText(link)
        alert('Shareable link copied to clipboard!')
      } else {
        console.error('Failed to generate shareable link')
      }
    }
  }, [session])

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
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          {session?.user?.name ? `${session.user.name}'s Daily Progress` : 'Daily Progress'}
        </h2>
        <div className="flex justify-center items-center space-x-4">
          <FaCheckCircle className="text-green-500 text-3xl" />
          <span className="text-4xl font-bold text-indigo-600">
            {completedAmbitions} / {totalAmbitions}
          </span>
          <FaHourglassHalf className="text-yellow-500 text-3xl" />
        </div>
        <p className="mt-2 text-gray-600">ambitions achieved</p>
        <motion.button
          onClick={generateShareableLink}
          className="mt-4 flex items-center justify-center mx-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaShare className="mr-2" />
          Share Dashboard
        </motion.button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          className="w-full md:w-1/2 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">
            {session?.user?.name ? `${session.user.name}'s Daily Ambitions` : 'Daily Ambitions'}
          </h2>
          <form onSubmit={handleAddAmbition} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={newAmbition}
                onChange={(e) => setNewAmbition(e.target.value)}
                placeholder="Add new ambition(s), separate multiple with commas"
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <motion.button 
                  type="submit" 
                  className="flex items-center justify-center w-8 h-8 text-indigo-500 hover:text-indigo-600 focus:outline-none"
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 1.3 }}
                >
                  <FaPlus />
                </motion.button>
              </div>
            </div>
          </form>
          <AmbitionsList 
            ambitions={ambitions} 
            onAmbitionsChange={handleAmbitionsChange}
            onAmbitionCompleted={handleAmbitionCompleted}
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
            updateDashboardData={updateDashboardData}
            ambitions={ambitions}
            onAmbitionCompleted={handleAmbitionCompleted}
            updateSanityDashboard={updateSanityDashboard}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}