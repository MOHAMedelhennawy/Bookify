import React from 'react';

export default function AddEventForm({ newEvent, onInputChange, onSubmit, categories = [] }) {
  return (
    <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 pb-2 border-b-2 border-slate-200">Add New Event</h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title || ''}
          onChange={onInputChange}
          required
          minLength={2}
          maxLength={50}
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        
        {/* Date */}
        <input
          type="date"
          name="date"
          value={newEvent.date || ''}
          onChange={onInputChange}
          required
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        
        {/* Category Selection */}
        <select
          name="categoryId"
          value={newEvent.categoryId || ''}
          onChange={onInputChange}
          required
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          <option value="">Select Category</option>
          { Object.entries(categories).map(([category, id]) => (
            <option key={ id } value={ id }>
              {category}
            </option>
          ))}
        </select>

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newEvent.address || ''}
          onChange={onInputChange}
          required
          minLength={2}
          maxLength={50}
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location || ''}
          onChange={onInputChange}
          required
          minLength={2}
          maxLength={50}
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />

        {/* Venue */}
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={newEvent.venue || ''}
          onChange={onInputChange}
          required
          minLength={2}
          maxLength={50}
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newEvent.price || ''}
          onChange={onInputChange}
          required
          min="0"
          step="0.01"
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />

        {/* Image Upload */}
        <input
          type="file"
          name="eventImg"
          accept="image/*"
          onChange={onInputChange}
          required
          className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Description - Full width */}
        <textarea
          name="description"
          placeholder="Event Description (10-2000 characters)"
          value={newEvent.description || ''}
          onChange={onInputChange}
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          className="col-span-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        />
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="col-span-full px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}