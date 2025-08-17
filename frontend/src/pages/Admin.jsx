import React from 'react';
import StatsSection from '../components/Admin/StatsSection';
import AddEventForm from '../components/Admin/AddEventForm';
import EventsTable from '../components/Admin/EventsTable';
import BookingsTable from '../components/Admin/BookingsTable';
import useAdminLogic from '../components/Admin/hooks/useAdminLogic';

export default function Admin() {
  const {
    events,
    bookings,
    newEvent,
    categories,
    showEvents,
    showBookings,
    currentEvents,
    setCurrentEvents,
    setShowEvents,
    setShowBookings,
    handleInputChange,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleStatusChange
  } = useAdminLogic();

  return (
    <div className="p-8 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Admin Dashboard</h1>
      
      <StatsSection 
        eventsCount={events.length} 
        bookingsCount={Array.isArray(bookings) ? bookings.length : 0} 
      />

      <AddEventForm 
        newEvent={newEvent}
        onInputChange={handleInputChange}
        onSubmit={handleAddEvent}
        categories={categories}
      />

      <EventsTable 
        events={events}
        showEvents={showEvents}
        setShowEvents={setShowEvents}
        currentEvents={currentEvents}
        setCurrentEvents={setCurrentEvents}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <BookingsTable 
        bookings={bookings}
        showBookings={showBookings}
        setShowBookings={setShowBookings}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}