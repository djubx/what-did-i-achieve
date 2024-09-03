import React, { useState, useEffect } from 'react';
import { format, addMinutes, parseISO } from 'date-fns';

export interface TimeSlot {
  _key: string;
  startTime: string;
  endTime: string;
  ambition: string;
}

interface Ambition {
  _key: string;
  id: string;
  text: string;
  completed: boolean;
  color: string;
}

interface TimeTrackerProps {
  dashboardData: any;
  updateDashboardData: (newData: any) => void;
  ambitions: Ambition[];
  onAmbitionCompleted: (id: string, completed: boolean) => void;
  updateSanityDashboard: (newAmbitions: Ambition[], newTimeSlots?: TimeSlot[], newStartTime?: Date) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ 
  dashboardData, 
  updateDashboardData, 
  ambitions, 
  onAmbitionCompleted,
  updateSanityDashboard
}) => {
  const [startTime, setStartTime] = useState<Date>(new Date(new Date().setHours(6, 0, 0, 0)));
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (dashboardData?.todayStartTime) {
      setStartTime(parseISO(dashboardData.todayStartTime));
    }
  }, [dashboardData]);

  useEffect(() => {
    if (dashboardData?.timeTracker) {
      setTimeSlots(dashboardData.timeTracker);
    }
  }, [dashboardData]);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newStartTime = new Date(new Date().setHours(hours, minutes, 0, 0));
    setStartTime(newStartTime);
    updateSanityDashboard(ambitions, timeSlots, newStartTime);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, slotTime: Date) => {
    e.preventDefault();
    const ambitionId = e.dataTransfer.getData('text/plain');
    const ambition = ambitions.find(a => a.id === ambitionId && !a.completed);
    if (ambition) {
      const existingSlotIndex = timeSlots.findIndex(slot => 
        slot.startTime && slot.endTime &&
        parseISO(slot.startTime) <= slotTime && parseISO(slot.endTime) > slotTime
      );

      let newTimeSlots: TimeSlot[];

      if (existingSlotIndex !== -1) {
        // Update existing slot
        newTimeSlots = timeSlots.map((slot, index) => 
          index === existingSlotIndex 
            ? { ...slot, ambition: ambition.text }
            : slot
        );
      } else {
        // Create new slot
        const newSlot: TimeSlot = {
          _key: `timeSlot_${Date.now()}`,
          startTime: slotTime.toISOString(),
          endTime: addMinutes(slotTime, 30).toISOString(),
          ambition: ambition.text
        };
        newTimeSlots = [...timeSlots, newSlot];
      }

      setTimeSlots(newTimeSlots);
      updateSanityDashboard(ambitions, newTimeSlots);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const renderTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 32; i++) {
      const slotTime = addMinutes(startTime, i * 30);
      const existingSlot = timeSlots.find(slot => 
        slot.startTime && slot.endTime &&
        parseISO(slot.startTime) <= slotTime && parseISO(slot.endTime) > slotTime
      );

      slots.push(
        <li 
          key={`slot-${i}`}
          className="px-4 py-4 flex items-center justify-between"
          onDrop={(e) => handleDrop(e, slotTime)}
          onDragOver={handleDragOver}
          style={{ backgroundColor: ambitions.find(a => a.text === existingSlot?.ambition)?.color || 'transparent' }}
        >
          <span className="text-sm font-medium text-gray-900">
            {format(slotTime, 'HH:mm')}
          </span>
          <span className="text-sm text-gray-500">
            {existingSlot?.ambition || 'Drag an ambition here'}
          </span>
        </li>
      );
    }
    return slots;
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
          {renderTimeSlots()}
        </ul>
      </div>
    </div>
  );
};

export default TimeTracker;