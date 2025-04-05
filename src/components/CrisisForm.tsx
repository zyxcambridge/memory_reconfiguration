import React, { useState, useEffect } from 'react';
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
  const [streamingResponse, setStreamingResponse] = useState<StreamingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const generateStreamingResponse = async (situation: string) => {
    try {
      setError(null);
      setStreamingResponse({
        script: '',
        strategy: '',
        actions: [],
        isComplete: false
      });
      
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

      // 创建流式响应
      const result = await model.generateContentStream(prompt);
      
      let accumulatedText = '';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        
        try {
          // 尝试解析累积的文本，可能会在完整JSON形成前失败
          const cleanText = accumulatedText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
          
          // 尝试解析JSON，如果不完整会抛出错误
          try {
            const parsedResponse = JSON.parse(cleanText);
            
            // 更新流式响应状态
            setStreamingResponse(prev => ({
              script: parsedResponse.script || prev?.script || '',
              strategy: parsedResponse.strategy || prev?.strategy || '',
              actions: Array.isArray(parsedResponse.actions) ? parsedResponse.actions : prev?.actions || [],
              isComplete: false
            }));
          } catch (parseError) {
            // JSON解析错误，说明响应尚未完成，继续累积
            // 尝试提取部分内容以显示进度
            const scriptMatch = cleanText.match(/"script"\s*:\s*"([^"]*)"/i);
            const strategyMatch = cleanText.match(/"strategy"\s*:\s*"([^"]*)"/i);
            
            setStreamingResponse(prev => ({
              script: scriptMatch ? scriptMatch[1] : prev?.script || '',
              strategy: strategyMatch ? strategyMatch[1] : prev?.strategy || '',
              actions: prev?.actions || [],
              isComplete: false
            }));
          }
        } catch (e) {
          // 忽略解析错误，继续累积文本
        }
      }
      
      // 流式响应完成，进行最终解析
      const finalCleanText = accumulatedText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      try {
        const finalParsedResponse = JSON.parse(finalCleanText);
        if (!finalParsedResponse.script || !finalParsedResponse.strategy || !finalParsedResponse.actions) {
          throw new Error('Invalid response format');
        }
        
        // 设置最终完整响应
        setStreamingResponse({
          script: finalParsedResponse.script,
          strategy: finalParsedResponse.strategy,
          actions: Array.isArray(finalParsedResponse.actions) ? finalParsedResponse.actions : [],
          isComplete: true
        });
        
        return true;
      } catch (e) {
        console.error('Error parsing final response:', e, 'Response text:', finalCleanText);
        setError(`API返回了无效的JSON格式: ${finalCleanText}`);
        return false;
      }
    } catch (error) {
      console.error('Error generating streaming response:', error);
      setError(`生成响应失败: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) {
      setError('请输入有效的职场危机描述');
      return;
    }
    setLoading(true);
    setShowResults(true);
    try {
      await generateStreamingResponse(situation);
    } catch (error) {
      console.error('Error:', error);
      setError(`生成响应失败: ${error instanceof Error ? error.message : String(error)}`);
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
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {showResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">应对方案 {!streamingResponse.isComplete && <span className="text-sm text-blue-500 animate-pulse">生成中...</span>}</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">推荐话术</h4>
            <p className="text-gray-700 whitespace-pre-line">
              {streamingResponse.script || <span className="text-gray-400 animate-pulse">生成中...</span>}
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">策略建议</h4>
            <p className="text-gray-700">
              {streamingResponse.strategy || <span className="text-gray-400 animate-pulse">生成中...</span>}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">行动步骤</h4>
            {streamingResponse.actions.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {streamingResponse.actions.map((action, index) => (
                  <li key={index} className="text-gray-700">{action}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 animate-pulse">生成中...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrisisForm;