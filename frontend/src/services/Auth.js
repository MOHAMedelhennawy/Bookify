import axios from 'axios';
import FetchErrorHandler from "./FetchErrorHandler";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userRegisterationPost = FetchErrorHandler(async (data) => {
    if (!data) {
        throw new Error("User data is missing");
    }

    const response = await axios.post(`${API_BASE_URL}/signup`, data, { withCredentials: true });
    return response;
});

export const userLoginPost = FetchErrorHandler(async (data) => {
    if (!data) {
        throw new Error("User data is missing");
    }

    const response = await axios.post(`${API_BASE_URL}/login`, data, { withCredentials: true });
    return response.data;
})