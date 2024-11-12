import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Wand2 className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Text Generators</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              All Generators
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;