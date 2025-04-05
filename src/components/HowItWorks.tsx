import React from 'react';
import { Brain, Shield, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: Brain,
    title: "Identify the Crisis",
    description: "Learn to recognize workplace challenges early through our comprehensive assessment tools."
  },
  {
    icon: Shield,
    title: "Strategic Response",
    description: "Develop effective response strategies using our proven frameworks and expert guidance."
  },
  {
    icon: MessageSquare,
    title: "Professional Support",
    description: "Access our network of experienced professionals for personalized advice and solutions."
  }
];

function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our systematic approach helps you navigate workplace challenges effectively
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;