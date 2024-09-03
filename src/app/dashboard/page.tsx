'use client'

import React, { useState } from 'react';
import AmbitionsList from '@/components/AmbitionsList'
import TimeTracker from '@/components/TimeTracker'

interface Ambition {
  id: string;
  text: string;
  completed: boolean;
}

export default function Dashboard() {
  const [ambitions, setAmbitions] = useState<Ambition[]>([]);

  const handleAmbitionsChange = (newAmbitions: Ambition[]) => {
    setAmbitions(newAmbitions);
  };

  const handleAmbitionUsed = (id: string) => {
    setAmbitions(ambitions.map(ambition => 
      ambition.id === id ? { ...ambition, completed: true } : ambition
    ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <AmbitionsList onAmbitionsChange={handleAmbitionsChange} />
      </div>
      <div className="w-full md:w-1/2">
        <TimeTracker 
          ambitions={ambitions.filter(a => !a.completed)} 
          onAmbitionUsed={handleAmbitionUsed}
        />
      </div>
    </div>
  )
}