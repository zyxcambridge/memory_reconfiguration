import React, { useState } from 'react';
import { Brain, Shield, MessageSquare, Scale, FolderLock, Menu, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Toolkit from './components/Toolkit';
import EmergencyKit from './components/EmergencyKit';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEmergencyKit, setShowEmergencyKit] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <main>
        {showEmergencyKit ? (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">职场急救包生成器</h2>
                <button 
                  onClick={() => setShowEmergencyKit(false)}
                  className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  返回首页
                </button>
              </div>
              <EmergencyKit />
            </div>
          </section>
        ) : (
          <>
            <Hero />
            <Features />
            <div className="bg-blue-50 py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">需要紧急应对职场危机？</h2>
                <p className="text-lg text-gray-600 mb-6">获取法律+心理+行动三位一体应对清单</p>
                <button 
                  onClick={() => setShowEmergencyKit(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  打开职场急救包生成器
                </button>
              </div>
            </div>
            <HowItWorks />
            <Testimonials />
            <Toolkit />
          </>
        )}
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