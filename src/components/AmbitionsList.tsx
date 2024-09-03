import React from 'react';

const AmbitionsList: React.FC = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Daily Ambitions</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Add and track your daily goals</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {/* TODO: Implement ambitions list items */}
          <li className="px-4 py-4">Example ambition item</li>
        </ul>
      </div>
    </div>
  );
};

export default AmbitionsList;