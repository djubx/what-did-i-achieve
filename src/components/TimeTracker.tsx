import React from 'react';

const TimeTracker: React.FC = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Time Tracker</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Track your daily activities in 30-minute slots</p>
      </div>
      <div className="border-t border-gray-200">
        {/* TODO: Implement time tracking grid */}
        <div className="px-4 py-4">Time tracking grid placeholder</div>
      </div>
    </div>
  );
};

export default TimeTracker;