import React from 'react';

interface Ambition {
  id: string;
  text: string;
  completed: boolean;
  color: string;
}

interface AmbitionsListProps {
  ambitions: Ambition[];
  onAmbitionsChange: (newAmbitions: Ambition[]) => void;
  onAmbitionCompleted: (id: string, completed: boolean) => void;
}

const AmbitionsList: React.FC<AmbitionsListProps> = ({ ambitions, onAmbitionsChange, onAmbitionCompleted }) => {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleRemove = (id: string) => {
    onAmbitionsChange(ambitions.filter(ambition => ambition.id !== id));
  };

  const handleCompletedChange = (id: string, completed: boolean) => {
    onAmbitionCompleted(id, completed);
  };

  const activeAmbitions = ambitions.filter(ambition => !ambition.completed);
  const completedAmbitions = ambitions.filter(ambition => ambition.completed);

  const renderAmbition = (ambition: Ambition) => (
    <li
      key={ambition.id}
      draggable={!ambition.completed}
      onDragStart={(e) => handleDragStart(e, ambition.id)}
      className="px-4 py-4 flex items-center justify-between cursor-move"
      style={{ backgroundColor: ambition.color }}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={ambition.completed}
          onChange={(e) => handleCompletedChange(ambition.id, e.target.checked)}
          className="mr-2"
        />
        <span className={`text-sm text-gray-900 ${ambition.completed ? 'line-through' : ''}`}>
          {ambition.text}
        </span>
      </div>
      <button
        onClick={() => handleRemove(ambition.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </li>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Active Ambitions</h3>
      <ul className="divide-y divide-gray-200 mb-8">
        {activeAmbitions.map(renderAmbition)}
      </ul>
      
      {completedAmbitions.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Completed Ambitions</h3>
          <ul className="divide-y divide-gray-200">
            {completedAmbitions.map(renderAmbition)}
          </ul>
        </>
      )}
    </div>
  );
};

export default AmbitionsList;