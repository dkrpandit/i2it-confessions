import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>404 - Page Not Found</h1>
      <p className='text-gray-600 mb-8'>Oops! The page you are looking for does not exist.</p>
      <Link to='/' className='flex items-center text-blue-500 hover:text-blue-700'>
        <Home className='mr-2' />
        Back to Home
      </Link>
    </div>
  );
};

