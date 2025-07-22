import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from "react-router-dom";

import registerSchema from "../../schemas/registerSchema"
import loginSchema from "../../schemas/loginSchema"
import { userLoginPost, userRegisterationPost } from '../../services/Auth';
import { useToast } from '../../Context/ToastContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { error: showError } = useToast();

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const [ formErrors, setErrors ] = useState({});

  const validate = () => {
    const { error } = loginSchema.validate(formData, { abortEarly: false })
    
    if (error) {
      const errors = {};
      error.details.forEach(detail => {
        errors[detail.path[0]] = detail.message;        
      });
      setErrors(errors);

      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      try {
        const res = await userLoginPost(formData);
        navigate("/", {replace: true});
        window.location.reload();
      } catch (error) {
        if (error.response?.status === 401) {
          showError("Make sure that your email and password are correct.");
        } else {
          showError("Login failed. Please try again.");
        }
      }
    } else {
      console.error("Validation error: ", formErrors);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value}))
  };

  return (
    <div className="flex items-center justify-center px-4">
      <form
        className="w-[30rem] bg-[#1b2b44] p-8 rounded-2xl shadow-lg"
        onSubmit={ handleSubmit }
      >
        <h2 className="text-2xl font-bold text-white text-center">Create an Account</h2>
        <p className="text-gray-400 mb-6 text-center">
          Welcome back! Log in to access your account and manage your event bookings.
        </p>

        <div className="mb-3">
          <input
            onChange={ handleChange }
            placeholder="Email"
            type="email"
            name="email"
            className="w-full px-4 py-2 rounded-lg text-white border border-gray-600 focus:outline-none"
            // required
          />
          <div className="w-full h-5 px-2">
            {formErrors.email && (
              <span className="text-red-500 text-sm">{formErrors.email}</span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <input
            onChange={ handleChange }
            placeholder="Password"
            type="password"
            name="password"
            className="w-full px-4 py-2 rounded-lg text-white border border-gray-600 focus:outline-none"
            // required
          />
          <div className="w-full h-5 px-2">
            {formErrors.password && (
              <span className="text-red-500 text-sm">{formErrors.password}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mb-2 py-2 px-4 rounded-lg transition"
        >
          Register
        </button>
        <button
          className="w-full text-gray-400 font-semibold py-2 px-4 rounded-lg transition border border-blue-600 hover:border-blue-800 hover:ring-1 hover:ring-blue-800"
        >
          <div className="flex items-center justify-center gap-2">
            <FcGoogle className="text-xl" />
            <p>Sign in with Google</p>
          </div>
        </button>
      </form>
    </div>
    
  )
}
