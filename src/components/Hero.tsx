import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            职场危机快速应对解决方案
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            提供专业的法律支持、心理辅导和行动指导，帮助您应对职场危机
          </p>
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