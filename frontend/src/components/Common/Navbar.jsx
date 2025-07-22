import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useToast } from '../../Context/ToastContext';
import { useAuth } from '../../Context/AuthContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Navbar() {
    const navigate = useNavigate();

    // Contexts
    const { user, loading, setUser } = useAuth();
    const { success, error } = useToast();

    const handleLogout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
            setUser(null);
            success("Logged out successfully!");
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
            setUser(null);
            error("Logout failed, but you've been logged out locally.");
            navigate("/");
        }
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex pt-1 h-14 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                    <h1 className='text-[#4973ff] text-[1.7rem] font-medium' style={{fontFamily: 'Playfair Display, serif'}}>Bookify</h1>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#4973ff] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            aria-current="page"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/events"
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#4973ff] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            aria-current="page"
                        >
                            Events
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#4973ff] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            aria-current="page"
                        >
                            About
                        </NavLink>
                    </div>
                    </div>
                </div>
                {loading ? null : (
                    !user ? (<div className='flex gap-3'>
                    <div>
                        <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                            Login
                        </Link>
                    </div>
                    <div>
                        <Link to="/register" className="rounded-md bg-[#4973ff] px-3 py-2 text-sm font-medium text-white hover:bg-[#3d5fd9] transition-colors">
                            Register
                        </Link>
                    </div>
                </div>) : (
                    <div>
                        <button onClick={ handleLogout } className="rounded-md bg-[#4973ff] px-3 py-2 text-sm font-medium text-white hover:bg-[#3d5fd9] transition-colors">
                            Logout
                        </button>
                    </div>)
                )}
            </div>
        </div>
        </nav>
    )
}
