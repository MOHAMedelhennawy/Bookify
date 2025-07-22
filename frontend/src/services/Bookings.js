import axios from "axios"
import FetchErrorHandler from "./FetchErrorHandler";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllUserBookings = FetchErrorHandler(async () => {
    return await axios.get(`${API_BASE_URL}/bookings`, { withCredentials: true })
});

export const bookEvent = FetchErrorHandler(async (eventId) => {
    return await axios.post(`${API_BASE_URL}/bookings/${eventId}`, null, { withCredentials: true });
});

export const deleteBooking = FetchErrorHandler(async (eventId) => {
    return await axios.delete(`${API_BASE_URL}/bookings/${eventId}`,  { withCredentials: true });
});