import React from 'react';
import { Brain, MessageSquare, Scale, FolderLock } from 'lucide-react';

const features = [
  {
    name: '记忆重写',
    description: '让你在"如果重来一次"的场景中，学习最优应对路径',
    icon: Brain,
  },
  {
    name: '职场急救包',
    description: '关键时刻不慌乱，有章可循的应对方案',
    icon: MessageSquare,
  },
  {
    name: '谈判演练系统',
    description: '从沉默到主导，你只差一个专业剧本',
    icon: Scale,
  },
  {
    name: '证据管理工具',
    description: '安全加密存储重要证据，随时备查',
    icon: FolderLock,
  },
];

const Features = () => {
  return (
    <div className="bg-white py-24" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            全方位职场保护
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            从心理支持到法律援助，我们提供完整的职场危机应对解决方案
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;