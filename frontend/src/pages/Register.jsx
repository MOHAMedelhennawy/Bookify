import React, { useState } from 'react'
import RegisterForm from '../components/Auth/RegisterForm'

export default function Register() {
    return (
        <div className='h-[100vh] bg-[#0e1726] flex justify-center items-center'>
            <RegisterForm />
        </div>
      );
}
