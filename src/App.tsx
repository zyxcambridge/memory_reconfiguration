import React, { useState } from 'react';
import { Brain, Shield, MessageSquare, Scale, FolderLock, Menu, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Toolkit from './components/Toolkit';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Toolkit />
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">© 2025 职场危机应对系统. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;