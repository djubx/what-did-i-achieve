import React, { useState } from 'react';

interface Ambition {
  id: string;
  text: string;
  completed: boolean;
}

const AmbitionsList: React.FC = () => {
  const [ambitions, setAmbitions] = useState<Ambition[]>([]);
  const [newAmbition, setNewAmbition] = useState('');

  const addAmbition = () => {
    if (newAmbition.trim() !== '') {
      setAmbitions([...ambitions, { id: Date.now().toString(), text: newAmbition, completed: false }]);
      setNewAmbition('');
    }
  };

  const toggleAmbition = (id: string) => {
    setAmbitions(ambitions.map(ambition => 
      ambition.id === id ? { ...ambition, completed: !ambition.completed } : ambition
    ));
  };

  const removeAmbition = (id: string) => {
    setAmbitions(ambitions.filter(ambition => ambition.id !== id));
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Daily Ambitions</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Add and track your daily goals</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">New Ambition</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                value={newAmbition}
                onChange={(e) => setNewAmbition(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter a new ambition"
              />
              <button
                onClick={addAmbition}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Ambition
              </button>
            </dd>
          </div>
        </dl>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {ambitions.map((ambition) => (
            <li key={ambition.id} className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={ambition.completed}
                  onChange={() => toggleAmbition(ambition.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className={`ml-3 ${ambition.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {ambition.text}
                </span>
              </div>
              <button
                onClick={() => removeAmbition(ambition.id)}
                className="text-red-600 hover:text-red-900"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AmbitionsList;