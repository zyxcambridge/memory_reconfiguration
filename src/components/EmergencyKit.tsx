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
  const [eventType, setEventType] = useState<string>('');
  const [customSituation, setCustomSituation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EmergencyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventTypes = [
    { id: 'dismissal', label: '突然辞退' },
    { id: 'pua', label: '职场PUA' },
    { id: 'salary-cut', label: '变相降薪' },
    { id: 'custom', label: '其他情况' }
  ];

  const generateEmergencyKit = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // 初始化空响应
      setResponse({
        legalAdvice: {
          script: '',
          recordingTips: '',
          lawyerContact: ''
        },
        mentalSupport: {
          breathingMethod: '',
          anxietyNotes: '',
          meditationAudio: ''
        },
        actionPlan: [],
        isComplete: false
      });
      
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      
      let situation = customSituation;
      if (eventType !== 'custom') {
        const selectedEvent = eventTypes.find(e => e.id === eventType);
        situation = selectedEvent ? selectedEvent.label : '';
      }
      
      const prompt = `
        你是一个JSON格式生成器。请根据以下职场危机情况生成JSON格式的三位一体应对清单：
        "${situation}"
        
        必须使用以下JSON格式，不要包含任何额外文本或解释：
        {
          "legalAdvice": {
            "script": "详细的法律处理话术模板，包括如何表达自己的权利和立场",
            "recordingTips": "如何合法录音保存证据的具体建议",
            "lawyerContact": "寻求法律帮助的建议和资源"
          },
          "mentalSupport": {
            "breathingMethod": "478呼吸法详细指导",
            "anxietyNotes": "焦虑笔记法的具体步骤",
            "meditationAudio": "推荐的冥想引导音频资源"
          },
          "actionPlan": ["具体行动步骤1：备份资料", "具体行动步骤2：录音", "具体行动步骤3：拖延话术", "具体行动步骤4：咨询律师", "具体行动步骤5：澄清协议"]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      // 清理和解析响应
      const cleanText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      try {
        const parsedResponse = JSON.parse(cleanText);
        
        // 验证响应格式
        if (!parsedResponse.legalAdvice || !parsedResponse.mentalSupport || !parsedResponse.actionPlan) {
          throw new Error('Invalid response format');
        }
        
        // 设置完整响应
        setResponse({
          legalAdvice: {
            script: parsedResponse.legalAdvice.script || '',
            recordingTips: parsedResponse.legalAdvice.recordingTips || '',
            lawyerContact: parsedResponse.legalAdvice.lawyerContact || ''
          },
          mentalSupport: {
            breathingMethod: parsedResponse.mentalSupport.breathingMethod || '',
            anxietyNotes: parsedResponse.mentalSupport.anxietyNotes || '',
            meditationAudio: parsedResponse.mentalSupport.meditationAudio || ''
          },
          actionPlan: Array.isArray(parsedResponse.actionPlan) ? parsedResponse.actionPlan : [],
          isComplete: true
        });
      } catch (e) {
        console.error('Error parsing response:', e, 'Response text:', cleanText);
        setError(`API返回了无效的格式: ${cleanText}`);
      }
    } catch (error) {
      console.error('Error generating emergency kit:', error);
      setError(`生成应急方案失败: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType) {
      setError('请选择一个事件类型');
      return;
    }
    
    if (eventType === 'custom' && !customSituation) {
      setError('请描述您的具体情况');
      return;
    }
    
    await generateEmergencyKit();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">职场急救包生成器</h2>
        <p className="text-gray-600">遭遇突发事件时，一键生成"法律+心理+行动"三位一体应对清单</p>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">选择突发事件类型</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setEventType(type.id)}
                className={`py-3 px-4 rounded-lg border transition-colors ${eventType === type.id 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        {eventType === 'custom' && (
          <div className="mb-6">
            <label htmlFor="customSituation" className="block text-sm font-medium text-gray-700 mb-2">
              描述您的具体情况
            </label>
            <textarea
              id="customSituation"
              value={customSituation}
              onChange={(e) => setCustomSituation(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请详细描述您遇到的职场突发情况..."
            />
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading || (!eventType) || (eventType === 'custom' && !customSituation)}
          className={`w-full py-3 px-6 text-white rounded-lg transition-colors ${loading || (!eventType) || (eventType === 'custom' && !customSituation) 
            ? 'bg-gray-400' 
            : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? '生成急救包中...' : '生成职场急救包'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {response && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6 text-center">职场急救包 {!response.isComplete && <span className="text-sm text-blue-500 animate-pulse">生成中...</span>}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 法律处理 */}
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">法律处理</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">模板话术</h5>
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {response.legalAdvice.script || <span className="text-gray-400 animate-pulse">生成中...</span>}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">录音建议</h5>
                  <p className="text-gray-700 text-sm">
                    {response.legalAdvice.recordingTips || <span className="text-gray-400 animate-pulse">生成中...</span>}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">法律资源</h5>
                  <p className="text-gray-700 text-sm">
                    {response.legalAdvice.lawyerContact || <span className="text-gray-400 animate-pulse">生成中...</span>}
                  </p>
                </div>
              </div>
            </div>
            
            {/* 心理稳定 */}
            <div className="bg-green-50 p-5 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mr-3">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">心理稳定</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">478呼吸法</h5>
                  <p className="text-gray-700 text-sm">
                    {response.mentalSupport.breathingMethod || <span className="text-gray-400 animate-pulse">生成中...</span>}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">焦虑笔记法</h5>
                  <p className="text-gray-700 text-sm">
                    {response.mentalSupport.anxietyNotes || <span className="text-gray-400 animate-pulse">生成中...</span>}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">冥想引导</h5>
                  <p className="text-gray-700 text-sm">
                    {response.mentalSupport.meditationAudio || <span className="text-gray-400 animate-pulse">生成中...</span>}
                  </p>
                </div>
              </div>
            </div>
            
            {/* 行动清单 */}
            <div className="bg-amber-50 p-5 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 mr-3">
                  <ListChecks className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">行动清单</h4>
              </div>
              
              {response.actionPlan.length > 0 ? (
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  {response.actionPlan.map((action, index) => (
                    <li key={index} className="text-gray-700">{action}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-400 animate-pulse">生成中...</p>
              )}
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>注意：以上建议仅供参考，具体情况请咨询专业人士</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyKit;