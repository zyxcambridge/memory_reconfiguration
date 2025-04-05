import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: '提交问题',
      description: '描述您遇到的职场问题，我们的系统会进行初步分析。',
    },
    {
      number: '02',
      title: '专业评估',
      description: '由法律专家和心理顾问对您的情况进行专业评估。',
    },
    {
      number: '03',
      title: '制定方案',
      description: '根据评估结果，为您制定个性化的解决方案。',
    },
    {
      number: '04',
      title: '持续支持',
      description: '全程提供专业支持，确保方案有效执行。',
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            如何使用我们的服务
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            简单四步，帮助您快速找到职场危机的解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;