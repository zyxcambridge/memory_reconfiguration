import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">职</span>
            </div>
            <span className="text-xl font-bold text-gray-900">职场守护者</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">功能模块</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900">危机指南</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900">法律资源</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900">用户故事</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900">联系我们</Link>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/" className="block text-gray-600 hover:text-gray-900">功能模块</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">危机指南</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">法律资源</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">用户故事</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">联系我们</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;