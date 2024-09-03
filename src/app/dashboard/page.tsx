'use client'

import React, { useState, useCallback } from 'react';
import AmbitionsList from '@/components/AmbitionsList'
import TimeTracker from '@/components/TimeTracker'

interface Ambition {
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
  const [ambitions, setAmbitions] = useState<Ambition[]>([]);
  const [newAmbition, setNewAmbition] = useState('');
  const [usedColors, setUsedColors] = useState<string[]>([]);

  const getUniqueColor = useCallback(() => {
    const availableColors = lightColors.filter(color => !usedColors.includes(color));
    if (availableColors.length === 0) {
      setUsedColors([]);
      return lightColors[0];
    }
    const newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    setUsedColors([...usedColors, newColor]);
    return newColor;
  }, [usedColors]);

  const handleAmbitionsChange = (newAmbitions: Ambition[]) => {
    setAmbitions(newAmbitions);
  };

  const handleAmbitionCompleted = (id: string, completed: boolean) => {
    setAmbitions(prevAmbitions => 
      prevAmbitions.map(ambition => 
        ambition.id === id ? { ...ambition, completed } : ambition
      )
    );
  };

  const handleAddAmbition = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAmbition.trim()) {
      const newAmbitionItem: Ambition = {
        id: Date.now().toString(),
        text: newAmbition.trim(),
        completed: false,
        color: getUniqueColor()
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
        <AmbitionsList 
          ambitions={ambitions} 
          onAmbitionsChange={handleAmbitionsChange}
          onAmbitionCompleted={handleAmbitionCompleted}
        />
      </div>
      <div className="w-full md:w-1/2">
        <TimeTracker 
          ambitions={ambitions} 
          onAmbitionCompleted={handleAmbitionCompleted}
        />
      </div>
    </div>
  )
}