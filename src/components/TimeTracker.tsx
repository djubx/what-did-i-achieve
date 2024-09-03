import React, { useState, useEffect } from 'react';
import { format, addMinutes } from 'date-fns';

interface TimeSlot {
  id: string;
  time: Date;
  ambition: string | null;
}

interface Ambition {
  id: string;
  text: string;
  completed: boolean;
}

interface TimeTrackerProps {
  ambitions: Ambition[];
  onAmbitionUsed: (id: string) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ ambitions, onAmbitionUsed }) => {
  const [startTime, setStartTime] = useState<Date>(new Date(new Date().setHours(6, 0, 0, 0)));
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const slots: TimeSlot[] = [];
    for (let i = 0; i < 32; i++) {
      slots.push({
        id: `slot-${i}`,
        time: addMinutes(startTime, i * 30),
        ambition: null,
      });
    }
    setTimeSlots(slots);
  }, [startTime]);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newStartTime = new Date(new Date().setHours(hours, minutes, 0, 0));
    setStartTime(newStartTime);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, slotId: string) => {
    e.preventDefault();
    const ambitionId = e.dataTransfer.getData('text/plain');
    const ambition = ambitions.find(a => a.id === ambitionId);
    if (ambition) {
      setTimeSlots(slots => slots.map(slot => 
        slot.id === slotId ? { ...slot, ambition: ambition.text } : slot
      ));
      onAmbitionUsed(ambitionId);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Time Tracker</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Track your daily activities in 30-minute slots</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Start Time</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="time"
                value={format(startTime, 'HH:mm')}
                onChange={handleStartTimeChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {timeSlots.map((slot) => (
            <li 
              key={slot.id} 
              className="px-4 py-4 flex items-center justify-between"
              onDrop={(e) => handleDrop(e, slot.id)}
              onDragOver={handleDragOver}
            >
              <span className="text-sm font-medium text-gray-900">
                {format(slot.time, 'HH:mm')}
              </span>
              <span className="text-sm text-gray-500">
                {slot.ambition || 'Drag an ambition here'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeTracker;