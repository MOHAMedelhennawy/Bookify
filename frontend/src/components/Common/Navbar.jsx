import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useToast } from '../../Context/ToastContext';
import { useAuth } from '../../Context/AuthContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { FaUser } from 'react-icons/fa';

export default function Navbar() {
    const navigate = useNavigate();

    // Contexts
    const { user, loading, setUser } = useAuth();
    const { success, error } = useToast();

    // Dropdown state and ref for click outside
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        if (!showDropdown) return;
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

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
                            <h1 className='text-[#4973ff] text-[1.7rem] font-medium' style={{ fontFamily: 'Playfair Display, serif' }}>Bookify</h1>
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
                        !user ? (
                            <div className='flex gap-3'>
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
                            </div>
                        ) : (
                            <div className="flex gap-3 items-center">
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white bg-[#4973ff] hover:bg-[#3d5fd9] shadow-md transition-all duration-150 focus:outline-none"
                                        onClick={() => setShowDropdown((prev) => !prev)}
                                        aria-haspopup="true"
                                        aria-expanded={showDropdown}
                                        type="button"
                                    >
                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#4973ff] shadow-inner">
                                            <FaUser size={14} />
                                        </span>
                                        <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 animate-fade-in">
                                            <ul className="py-2">
                                                {user?.role === "ADMIN" && (
                                                    <li>
                                                        <Link
                                                            to="/admin"
                                                            className="block px-5 py-2 text-sm text-[#4973ff] font-medium hover:bg-[#f0f4ff] rounded-t-xl transition-colors"
                                                            onClick={() => setShowDropdown(false)}
                                                        >
                                                            Admin Dashboard
                                                        </Link>
                                                    </li>
                                                )}
                                                <li>
                                                    <button
                                                        onClick={() => {
                                                            setShowDropdown(false);
                                                            handleLogout();
                                                        }}
                                                        className="w-full text-left px-5 py-2 text-sm text-red-700 hover:bg-red-100 rounded-b-xl transition-colors cursor-pointer"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </nav>
    )
}
