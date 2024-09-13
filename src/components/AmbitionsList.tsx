import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

interface Ambition {
  _key: string; // Add this line
  id: string;
  text: string;
  completed: boolean;
  color: string;
}

interface AmbitionsListProps {
  ambitions: Ambition[];
  onAmbitionsChange: (ambitions: Ambition[]) => void;
  onAmbitionCompleted: (id: string, completed: boolean) => void;
  readOnly?: boolean;
}

const AmbitionsList: React.FC<AmbitionsListProps> = ({ ambitions, onAmbitionsChange, onAmbitionCompleted, readOnly = false }) => {
  const handleRemove = (id: string) => {
    onAmbitionsChange(ambitions.filter(ambition => ambition.id !== id));
  };

  const handleCompletedChange = (id: string, completed: boolean) => {
    onAmbitionCompleted(id, completed);
  };

  const renderAmbition = (ambition: Ambition) => (
    <div
      key={ambition.id}
      className="flex items-center p-2 rounded-lg mb-2"
      style={{ backgroundColor: ambition.color }}
    >
      {!readOnly && (
        <input
          type="checkbox"
          checked={ambition.completed}
          onChange={() => handleCompletedChange(ambition.id, !ambition.completed)}
          className="mr-2"
        />
      )}
      <span className={`flex-grow ${ambition.completed ? 'line-through' : ''}`}>
        {ambition.text}
      </span>
      {!readOnly && !ambition.completed && (
        <button
          onClick={() => handleRemove(ambition.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );

  const activeAmbitions = ambitions.filter(ambition => !ambition.completed);
  const completedAmbitions = ambitions.filter(ambition => ambition.completed);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Active Ambitions</h3>
      <div className="space-y-2 mb-4">
        {activeAmbitions.map(renderAmbition)}
      </div>
      <h3 className="text-lg font-semibold mb-2">Completed Ambitions</h3>
      <div className="space-y-2">
        {completedAmbitions.map(renderAmbition)}
      </div>
    </div>
  );
};

export default AmbitionsList;