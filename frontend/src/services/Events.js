import axios from "axios";
import FetchErrorHandler from "./FetchErrorHandler";
import objectToQueryString from "../utils/objectToQueryString";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEvents = FetchErrorHandler(async (queryParameters) => {
    if (!queryParameters || typeof queryParameters !== 'object') {
        throw new Error("Invalid query parameters");
    }

    const queryString = objectToQueryString(queryParameters);
    const response = await axios.get(`${API_BASE_URL}/events/${queryString}`);

    return response.data;
});

export const getCategories = FetchErrorHandler(async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
});

export const addNewEvent = FetchErrorHandler(async (eventInformation) => {
    if (!eventInformation || typeof eventInformation !== 'object') {
        throw new Error("event information is missing");
    }

    const response = await axios.post(`${API_BASE_URL}/events`, eventInformation, { withCredentials: true });
    return response.data;
});

export const deleteEventByID = FetchErrorHandler(async (eventId) => {
    if (!eventId) {
        throw new Error("Event id is missing");
    }

    const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`, { withCredentials: true });
    return response;
});