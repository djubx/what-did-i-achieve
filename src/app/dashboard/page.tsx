'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { sanityClient } from '@/lib/sanity'
import TimeTracker, { TimeSlot } from '@/components/TimeTracker'

import AmbitionsList from '@/components/AmbitionsList'

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
      const newAmbitionItem: Ambition = {
        _key: Date.now().toString(), // Add this line
        id: Date.now().toString(),
        text: newAmbition.trim(),
        completed: false,
        color: getUniqueColor()
      };
      const newAmbitions = [...ambitions, newAmbitionItem];
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

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Daily Ambitions</h2>
        <form onSubmit={handleAddAmbition} className="mb-4">
          <input
            type="text"
            value={newAmbition}
            onChange={(e) => setNewAmbition(e.target.value)}
            placeholder="Add a new ambition"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
            Add Ambition
          </button>
        </form>
        <AmbitionsList 
          ambitions={ambitions} 
          onAmbitionsChange={handleAmbitionsChange}
          onAmbitionCompleted={handleAmbitionCompleted}
        />
      </div>
      <div className="w-full md:w-1/2">
        <TimeTracker 
          dashboardData={dashboardData}
          updateDashboardData={updateDashboardData}
          ambitions={ambitions}
          onAmbitionCompleted={handleAmbitionCompleted}
          updateSanityDashboard={updateSanityDashboard}
        />
      </div>
    </div>
  )
}