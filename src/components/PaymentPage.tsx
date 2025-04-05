import React, { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentPageProps {
  onClose: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onClose }) => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // 这里将来会集成Stripe的支付处理逻辑
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // 模拟支付处理
    setTimeout(() => {
      // 这里将来会替换为实际的Stripe支付处理逻辑
      const success = Math.random() > 0.3; // 模拟70%的成功率
      
      if (success) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('error');
        setErrorMessage('支付处理过程中出现错误，请稍后再试。');
      }
    }, 2000);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">职场危机应对服务</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          关闭
        </button>
      </div>
      
      {paymentStatus === 'success' ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">支付成功！</h3>
          <p className="text-gray-600 mb-6">感谢您购买我们的职场危机应对服务。</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      ) : paymentStatus === 'error' ? (
        <div className="text-center py-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">支付失败</h3>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => setPaymentStatus('idle')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              重试
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">服务内容</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>专业职场危机应对方案</li>
              <li>法律咨询服务（30分钟）</li>
              <li>心理支持资源包</li>
              <li>一对一行动计划制定</li>
            </ul>
            <div className="mt-4 text-xl font-bold text-right">¥0.01</div>
          </div>
          
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                持卡人姓名
              </label>
              <input
                type="text"
                id="cardName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入持卡人姓名"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                卡号
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  有效期
                </label>
                <input
                  type="text"
                  id="expiry"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                  安全码
                </label>
                <input
                  type="text"
                  id="cvc"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="CVC"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={paymentStatus === 'processing'}
              className={`w-full py-3 rounded-lg text-white font-medium ${paymentStatus === 'processing' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
            >
              {paymentStatus === 'processing' ? '处理中...' : '支付 ¥0.01'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>我们使用Stripe安全支付系统，您的支付信息受到保护。</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;