import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface EmergencyResponse {
  legalAdvice: string;
  psychologicalSupport: string;
  actionSteps: string[];
}

interface StreamingEmergency {
  legalAdvice: string;
  psychologicalSupport: string;
  actionSteps: string[];
  isComplete: boolean;
}

const EmergencyKit: React.FC = () => {
  const [emergencyDesc, setEmergencyDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingData, setStreamingData] = useState<StreamingEmergency | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const processStreamingResponse = async (description: string) => {
    try {
      setError(null);
      setStreamingData({
        legalAdvice: '',
        psychologicalSupport: '',
        actionSteps: [],
        isComplete: false
      });

      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      
      const prompt = `
        生成包含法律建议、心理支持和具体行动的三栏式JSON响应：
        "${description}"
        
        {
          "legalAdvice": "劳动法条款与维权步骤",
          "psychologicalSupport": "情绪管理技巧",
          "actionSteps": ["取证步骤", "沟通策略", "应急联系人"]
        }
      `;

      const result = await model.generateContentStream(prompt);
      let buffer = '';

      for await (const chunk of result.stream) {
        buffer += chunk.text();
        
        try {
          const cleanBuffer = buffer
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

          // 增强正则表达式匹配规则，支持转义引号和换行符
          const legalMatch = cleanBuffer.match(/"legalAdvice"\s*:\s*"((?:\\"|[^"])+)"/i);
          const psychoMatch = cleanBuffer.match(/"psychologicalSupport"\s*:\s*"((?:\\"|[^"])+)"/i);
          const actionMatch = cleanBuffer.match(/"actionSteps"\s*:\s*\[\s*((?:"(?:\\"|[^"])+"\s*,?\s*)+)\]/i);

          setStreamingData(prev => ({
            legalAdvice: legalMatch ? legalMatch[1] : prev?.legalAdvice || '',
            psychologicalSupport: psychoMatch ? psychoMatch[1] : prev?.psychologicalSupport || '',
            actionSteps: actionMatch ? 
              actionMatch[1].split(',').map(s => s.trim().replace(/^"|"$/g, '')) : 
              prev?.actionSteps || [],
            isComplete: false
          }));
        } catch (e) {
          // 持续解析中
        }
      }

      const finalClean = buffer
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      try {
        const finalData: EmergencyResponse = JSON.parse(finalClean);
        // 添加更严格的格式验证
        const isValidResponse = [
          finalData.legalAdvice?.length > 20,
          finalData.psychologicalSupport?.length > 20,
          Array.isArray(finalData.actionSteps) && finalData.actionSteps.length >= 3
        ].every(Boolean);

        if (!isValidResponse) {
          throw new Error(`响应格式不完整：${JSON.stringify(finalData)}`);
        }

        setStreamingData({
          ...finalData,
          isComplete: true
        });
        return true;
      } catch (e) {
        setError(`解析错误: ${e instanceof Error ? e.message : '未知错误'}（响应内容：${finalClean.slice(0, 200)}...）`);
        return false;
      }
    } catch (err) {
      setError(`请求失败: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyDesc.trim()) {
      setError('请输入紧急情况描述');
      return;
    }
    setLoading(true);
    setShowResults(true);
    try {
      await processStreamingResponse(emergencyDesc);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={emergencyDesc}
          onChange={(e) => setEmergencyDesc(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="描述突发事件（如：突然收到辞退通知...）"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-4 text-white rounded-lg transition-colors ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {loading ? '生成应急方案中...' : '启动应急方案'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-red-200 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">法律建议 {!streamingData?.isComplete && <span className="animate-pulse">⚖️</span>}</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {streamingData?.legalAdvice || '生成中...'}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">心理支持 {!streamingData?.isComplete && <span className="animate-pulse">🧠</span>}</h3>
            <p className="text-gray-700">
              {streamingData?.psychologicalSupport || '生成中...'}
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">行动步骤 {!streamingData?.isComplete && <span className="animate-pulse">⚡</span>}</h3>
            <ul className="list-disc list-inside space-y-2">
              {streamingData?.actionSteps.map((step, i) => (
                <li key={i} className="text-gray-700">{step}</li>
              )) || <li className="text-gray-400">生成中...</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyKit;