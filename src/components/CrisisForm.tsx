import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface CrisisResponse {
  script: string;
  strategy: string;
  actions: string[];
}

interface StreamingResponse {
  script: string;
  strategy: string;
  actions: string[];
  isComplete: boolean;
}

const CrisisForm: React.FC = () => {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CrisisResponse | null>(null);

  const generateResponse = async (situation: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      
      const prompt = `
        你是一个JSON格式生成器。请严格根据以下职场危机情况生成JSON格式的响应：
        "${situation}"
        
        必须使用以下JSON格式，不要包含任何额外文本或解释：
        {
          "script": "处理情况的详细话术",
          "strategy": "站在员工一方，为员工争取利益，整体策略建议",
          "actions": ["具体行动步骤1", "具体行动步骤2", "具体行动步骤3"]
        }
      `;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      
      // 清理响应文本，去除可能的Markdown代码块标记
      const cleanText = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      try {
        const parsedResponse = JSON.parse(cleanText);
        if (!parsedResponse.script || !parsedResponse.strategy || !parsedResponse.actions) {
          throw new Error('Invalid response format');
        }
        
        return {
          script: parsedResponse.script,
          strategy: parsedResponse.strategy,
          actions: Array.isArray(parsedResponse.actions) ? parsedResponse.actions : []
        } as CrisisResponse;
      } catch (e) {
        console.error('Error parsing response:', e, 'Response text:', cleanText);
        throw new Error(`API返回了无效的JSON格式: ${cleanText}`);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error(`生成响应失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateResponse(situation);
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
            描述你的职场危机情况
          </label>
          <textarea
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例如：今天被HR突然告知要离职..."
          />
        </div>
        <button
          type="submit"
          disabled={loading || !situation}
          className={`w-full py-3 px-6 text-white rounded-lg transition-colors ${
            loading || !situation ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '生成方案中...' : '生成应对方案'}
        </button>
      </form>

      {response && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">应对方案</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">推荐话术</h4>
            <p className="text-gray-700 whitespace-pre-line">{response.script}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">策略建议</h4>
            <p className="text-gray-700">{response.strategy}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">行动步骤</h4>
            <ul className="list-disc list-inside space-y-2">
              {response.actions.map((action, index) => (
                <li key={index} className="text-gray-700">{action}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrisisForm;