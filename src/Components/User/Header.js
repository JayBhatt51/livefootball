import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Placeholder for logo */}
          <img 
            src="logo.jpg" 
            alt="LiveFootball Logo" 
            className="w-10 h-10 rounded-full" 
          />
          <Link to="/" className="text-3xl font-extrabold text-white hover:text-yellow-300 transition duration-300">
            LiveFootball
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6
        ">
          <h1 to="/" className="text-2xl text-white  hover:text-yellow-300 transition duration-300">Feel the Action, Watch it Live.</h1>
        </nav>
      </div>
    </header>
  );
};

export default Header;
