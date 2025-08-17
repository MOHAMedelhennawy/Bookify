import { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus } from '../../../services/Bookings';
import { useToast } from '../../../Context/ToastContext';

export default function useBookingsLogic() {
  const [bookings, setBookings] = useState([]);
  
  const { error: showError, success } = useToast();

  const handleStatusChange = async (bookingId, newStatus) => {
    let prevBookings;
    const validStatuses = ['CONFIRMED', 'CANCELLED', 'PENDING'];

    if (!validStatuses.includes(newStatus)) {
      showError(`Invalid status: ${newStatus}`);
      return;
    }

    try {
      setBookings(prev => {
        prevBookings = [...prev];
        return prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus }
            : booking
        );
      });
      
      await updateBookingStatus(bookingId, newStatus);
      success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      showError("Failed to update booking status");
      setBookings(prevBookings);
    }
  };

  useEffect(() => {
    getAllBookings()
      .then(res => {
        setBookings(res.data.bookings);
      })
      .catch(err => {
        console.error("Failed to fetch bookings:", err);
      });
  }, []);

  return {
    bookings,
    handleStatusChange
  };
} 