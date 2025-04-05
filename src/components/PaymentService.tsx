import React, { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import StripePayment from './StripePayment';

interface PaymentServiceProps {
  onClose: () => void;
  onSuccess: () => void;
}

type PaymentMethod = 'stripe' | 'paypal' | null;
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const PaymentService: React.FC<PaymentServiceProps> = ({ onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // 产品价格
  const productPrice = 0.01;
  
  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };
  
  const handlePaymentError = (message: string) => {
    setPaymentStatus('error');
    setErrorMessage(message);
  };
  
  const resetPayment = () => {
    setPaymentMethod(null);
    setPaymentStatus('idle');
    setErrorMessage('');
  };
  
  // 渲染支付方式选择界面
  const renderPaymentMethodSelection = () => {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">服务内容</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>专业职场危机应对方案</li>
            <li>法律咨询服务（30分钟）</li>
            <li>心理支持资源包</li>
            <li>一对一行动计划制定</li>
          </ul>
          <div className="mt-4 text-xl font-bold text-right">¥{productPrice.toFixed(2)}</div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">选择支付方式</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod('stripe')}
              className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8" />
              <span className="text-sm text-gray-600">信用卡支付</span>
            </button>
            
            <button
              onClick={() => setPaymentMethod('paypal')}
              className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" className="h-8" />
              <span className="text-sm text-gray-600">PayPal支付</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染支付成功界面
  const renderSuccessState = () => {
    return (
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
    );
  };
  
  // 渲染支付错误界面
  const renderErrorState = () => {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">支付失败</h3>
        <p className="text-gray-600 mb-6">{errorMessage || '支付处理过程中出现错误，请稍后再试。'}</p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={resetPayment}
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
    );
  };
  
  // 渲染PayPal支付界面（简化版，实际应用中需要集成PayPal SDK）
  const renderPayPalPayment = () => {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">使用PayPal支付</h3>
          <p className="text-gray-600">您将被重定向到PayPal安全支付页面完成支付。</p>
          <div className="mt-4 text-xl font-bold text-right">¥{productPrice.toFixed(2)}</div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setPaymentStatus('processing');
              // 模拟PayPal支付过程
              setTimeout(() => {
                // 随机模拟支付结果
                if (Math.random() > 0.3) {
                  handlePaymentSuccess();
                } else {
                  handlePaymentError('PayPal支付处理失败，请稍后再试。');
                }
              }, 2000);
            }}
            disabled={paymentStatus === 'processing'}
            className={`flex-1 py-3 rounded-lg text-white font-medium ${paymentStatus === 'processing' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
          >
            {paymentStatus === 'processing' ? '处理中...' : `使用PayPal支付 ¥${productPrice.toFixed(2)}`}
          </button>
          <button
            onClick={resetPayment}
            disabled={paymentStatus === 'processing'}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            返回
          </button>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>PayPal是全球领先的在线支付平台，为您的交易提供安全保障。</p>
        </div>
      </div>
    );
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
        renderSuccessState()
      ) : paymentStatus === 'error' ? (
        renderErrorState()
      ) : paymentMethod === 'stripe' ? (
        <StripePayment 
          amount={productPrice} 
          onSuccess={handlePaymentSuccess} 
          onCancel={resetPayment} 
        />
      ) : paymentMethod === 'paypal' ? (
        renderPayPalPayment()
      ) : (
        renderPaymentMethodSelection()
      )}
    </div>
  );
};

export default PaymentService;