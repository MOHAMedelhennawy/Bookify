import React from 'react';
import Pagination from '../Common/Pagination';

export default function EventsTable({ 
  events, 
  showEvents, 
  setShowEvents, 
  currentEvents, 
  setCurrentEvents, 
  onEdit, 
  onDelete 
}) {
  return (
    <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 pb-2 border-b-2 border-slate-200">Events</h2>
        <svg 
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${showEvents ? "rotate-180" : ""}`} 
          fill="none" stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          onClick={() => setShowEvents(!showEvents)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {showEvents && events.events?.map(event => (
              <tr 
                key={event.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-700">{event.id}</td>
                <td className="px-4 py-3 text-gray-700">{event.title}</td>
                <td className="px-4 py-3 text-gray-700">{event.date}</td>
                <td className="px-4 py-3 text-gray-700">{event.category.name}</td>
                <td className="px-4 py-3 text-gray-700">{event.location}</td>
                <td className="px-4 py-3 text-gray-700 flex gap-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    onClick={() => onEdit(event)}
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    onClick={(e) => onDelete(e, event.id)}
                    title="Delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEvents && (
        <div className="flex justify-center">
          <Pagination 
            numberOfEvents={events.length} 
            limit={10} 
            currentPage={currentEvents} 
            setCurrentPage={setCurrentEvents} 
          />
        </div>
      )}
    </div>
  );
}