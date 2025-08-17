import React from 'react';

export default function BookingsTable({ 
  bookings, 
  showBookings, 
  setShowBookings, 
  onStatusChange 
}) {
  const bookingStatusColors = {
    'CONFIRMED': "bg-green-100 text-green-800",
    'PENDING': "bg-yellow-100 text-yellow-800",
    'CANCELLED': "bg-red-100 text-red-800"
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 pb-2 border-b-2 border-slate-200">Bookings</h2>
        <svg 
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${showBookings ? "rotate-180" : ""}`} 
          fill="none" stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          onClick={() => setShowBookings(!showBookings)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">User ID</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Event ID</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {showBookings && bookings.map(booking => (
              <tr 
                key={booking.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-700">{booking.id}</td>
                <td className="px-4 py-3 text-gray-700">{booking.userId}</td>
                <td className="px-4 py-3 text-gray-700">{booking.eventId}</td>
                <td className="px-4 py-3">
                  <select
                    value={booking.status}
                    onChange={(e) => onStatusChange(booking.id, e.target.value)}
                    className={`
                      px-3 py-2 rounded-lg text-xs font-semibold border-0
                      ${bookingStatusColors[booking.status]}
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-all duration-200 cursor-pointer
                    `}
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    {/* <option value="PENDING">PENDING</option> */}
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}