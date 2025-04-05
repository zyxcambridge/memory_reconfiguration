import React from 'react';
import { Brain, Shield, MessageSquare, Scale } from 'lucide-react';

const tools = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Crisis Analysis",
    description: "Advanced AI-powered analysis of workplace situations to identify potential issues and solutions."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Protection Strategies",
    description: "Comprehensive strategies to protect your rights and interests in challenging workplace scenarios."
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Communication Templates",
    description: "Professional templates for effective communication during workplace conflicts."
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Legal Resources",
    description: "Access to relevant legal information and resources for workplace dispute resolution."
  }
];

function Toolkit() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Toolkit</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and resources to help you navigate workplace challenges effectively
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 text-blue-600">
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Toolkit;