import axios from "axios"
import FetchErrorHandler from "./FetchErrorHandler";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllBookings = FetchErrorHandler(async () => {
    return await axios.get(`${API_BASE_URL}/bookings`, { withCredentials: true })
});

export const getAllUserBookings = FetchErrorHandler(async (userId) => {
    return await axios.get(`${API_BASE_URL}/bookings/${userId}`, { withCredentials: true })
});

export const bookEvent = FetchErrorHandler(async (eventId) => {
    return await axios.post(`${API_BASE_URL}/bookings/${eventId}`, null, { withCredentials: true });
});

export const deleteBooking = FetchErrorHandler(async (eventId) => {
    if (!eventId)
        throw new Error("Event id is missing");

    return await axios.delete(`${API_BASE_URL}/bookings/${eventId}`,  { withCredentials: true });
});

export const updateBookingStatus = FetchErrorHandler(async (bookingId, newStatus) => {
    if (!bookingId || !newStatus) {
        throw new Error("Booking data is missing");
    }

    return await axios.patch(
        `${API_BASE_URL}/bookings/${bookingId}`,
        { newStatus },
        { withCredentials: true }
    );
});