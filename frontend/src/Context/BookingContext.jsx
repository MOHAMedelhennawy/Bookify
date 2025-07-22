import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';

import { bookEvent, deleteBooking, getAllUserBookings } from "../services/Bookings";

const BookingsContext = createContext();

export default function BookingsProvider({ children }) {
    const { user } = useAuth();
    const [ userBookings, setUserBookings ] = useState([]);
    
    console.log(userBookings)
    useEffect(() => {
        if (user) {
            getAllUserBookings()
                .then(res => {
                    const bookingIds = res.data.bookings.map(b => b.eventId);
                    setUserBookings(bookingIds);
                });
        }
    }, [user]);


    useEffect(() => {
        if (user) {
            localStorage.setItem(`userBookings_${user.id}`, JSON.stringify(userBookings));
        }
    }, [userBookings, user]);

    const addBooking = async (eventId) => {
        setUserBookings(prev => [...prev, eventId]);

        const response = await bookEvent(eventId);

        if (response.status !== 201) {
            removeBooking(eventId);
            return false;
        }

        return true;
    };

    const removeBooking = async (eventId) => {
        setUserBookings(prev => prev.filter(id => id !== eventId));

        const response = await deleteBooking(eventId);

        if (response.status !== 202) {
            addBooking(eventId);
            return false;
        }

        return true;
    };

    return (
        <BookingsContext.Provider value={{
            userBookings,
            addBooking,
            removeBooking,
        }}>
            { children }
        </BookingsContext.Provider>
    );
}

export function useBookings() {
    return useContext(BookingsContext);
}