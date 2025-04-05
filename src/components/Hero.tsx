import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CrisisForm from './CrisisForm';

const Hero = () => {
  const [showCrisisForm, setShowCrisisForm] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              职场危机快速应对解决方案
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              提供专业的法律支持、心理辅导和行动指导，帮助您应对职场危机
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg mb-8">
            <button 
              onClick={() => setShowCrisisForm(!showCrisisForm)}
              className="w-full py-3 px-6 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {showCrisisForm ? '隐藏测试功能' : '立即测试危机应对功能'}
            </button>
            
            {showCrisisForm && (
              <div className="mt-6">
                <CrisisForm />
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/payment"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              立即获取解决方案
            </Link>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              了解更多
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;