import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Shield, BookOpen, Brain, ListChecks } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface EmergencyResponse {
  legalAdvice: {
    script: string;
    recordingTips: string;
    lawyerContact: string;
  };
  mentalSupport: {
    breathingMethod: string;
    anxietyNotes: string;
    meditationAudio: string;
  };
  actionPlan: string[];
  isComplete: boolean;
}

const EmergencyKit: React.FC = () => {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    legal: string[];
    psychological: string[];
    action: string[];
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 模拟API调用
    setTimeout(() => {
      setResult({
        legal: [
          '保存相关证据，包括邮件、聊天记录等',
          '了解相关法律法规，明确自己的权益',
          '考虑寻求法律援助或咨询律师'
        ],
        psychological: [
          '保持冷静，不要做出过激反应',
          '寻求信任的同事或朋友倾诉',
          '必要时寻求专业心理咨询'
        ],
        action: [
          '记录事件发生的时间、地点和过程',
          '与直属领导或HR沟通反映情况',
          '准备应对方案和退路规划'
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
            描述您遇到的职场问题
          </label>
          <textarea
            id="situation"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例如：遭遇职场霸凌、不公平对待等..."
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {loading ? '生成中...' : '生成应对方案'}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">法律建议</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.legal.map((item, index) => (
                <li key={index} className="text-blue-800">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-4">心理支持</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.psychological.map((item, index) => (
                <li key={index} className="text-green-800">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">行动建议</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.action.map((item, index) => (
                <li key={index} className="text-purple-800">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyKit;