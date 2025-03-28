import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './navigation/Navbar';
import { Logo } from './home/Logo';


export function Header() {

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex flex-row items-center gap-2">
            <Logo size={6} layout="row" showText={false} />
            <h1
              className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-lg"
            >
              HouseGPT
            </h1>
          </Link>

          <Navbar />

        </div>
      </div>
    </header>
  );
}