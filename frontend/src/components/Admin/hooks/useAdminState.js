import { useState } from 'react';

export default function useAdminState() {
  const [showEvents, setShowEvents] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  return {
    showEvents,
    showBookings,
    setShowEvents,
    setShowBookings
  };
} 