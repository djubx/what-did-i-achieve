import React from 'react';

interface Ambition {
  id: string;
  text: string;
  completed: boolean;
}

interface AmbitionsListProps {
  ambitions: Ambition[];
  onAmbitionsChange: (newAmbitions: Ambition[]) => void;
}

const AmbitionsList: React.FC<AmbitionsListProps> = ({ ambitions, onAmbitionsChange }) => {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleRemove = (id: string) => {
    onAmbitionsChange(ambitions.filter(ambition => ambition.id !== id));
  };

  return (
    <ul className="divide-y divide-gray-200">
      {ambitions.map((ambition) => (
        <li
          key={ambition.id}
          draggable
          onDragStart={(e) => handleDragStart(e, ambition.id)}
          className="px-4 py-4 flex items-center justify-between cursor-move"
        >
          <span className="text-sm text-gray-900">{ambition.text}</span>
          <button
            onClick={() => handleRemove(ambition.id)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AmbitionsList;