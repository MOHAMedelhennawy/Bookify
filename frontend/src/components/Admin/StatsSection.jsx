import React from 'react';
import CountUp from 'react-countup';

export default function StatsSection({ eventsCount, bookingsCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2"><CountUp end={ eventsCount } /></div>
        <div className="text-sm text-gray-600 font-medium">Total Events</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2"><CountUp end={ bookingsCount } /></div>
        <div className="text-sm text-gray-600 font-medium">Total Bookings</div>
      </div>
    </div>
  );
}