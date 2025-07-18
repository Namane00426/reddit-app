import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-white shadow-md py-4'>
      <div className='max-w-6xl mx-auto px-4' >
        <Link to="/" className="text-2xl font-bold text-accent1 hover:underline">
        Reddit App
        </Link>
      </div>
    
    </header>
  )
}