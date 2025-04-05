import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CrisisForm from './CrisisForm';

const Hero = () => {
  const [showCrisisForm, setShowCrisisForm] = useState(false);

  return (
    <div className="relative pt-24 overflow-hidden">
      <div className="container mx-auto px-4 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          你不是孤立无援的个体
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative">有权利、有工具、有出路</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          专业的职场危机应对系统，帮助你在职场困境中找到最佳解决方案。
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <button
            className="group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 focus-visible:outline-blue-600"
            onClick={() => setShowCrisisForm(!showCrisisForm)}
          >
            <span>启动危机应对模式</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        
        {showCrisisForm && (
          <div className="mt-12">
            <CrisisForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;