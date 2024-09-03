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
  const [newAmbition, setNewAmbition] = useState('');

  const handleAmbitionsChange = (newAmbitions: Ambition[]) => {
    setAmbitions(newAmbitions);
  };

  const handleAmbitionUsed = (id: string) => {
    setAmbitions(prevAmbitions => 
      prevAmbitions.map(ambition => 
        ambition.id === id ? { ...ambition, completed: true } : ambition
      )
    );
  };

  const handleAddAmbition = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAmbition.trim()) {
      const newAmbitionItem: Ambition = {
        id: Date.now().toString(),
        text: newAmbition.trim(),
        completed: false
      };
      setAmbitions(prevAmbitions => [...prevAmbitions, newAmbitionItem]);
      setNewAmbition('');
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
        <AmbitionsList ambitions={ambitions.filter(a => !a.completed)} onAmbitionsChange={handleAmbitionsChange} />
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