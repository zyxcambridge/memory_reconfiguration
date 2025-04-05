import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { CheckCircle, AlertCircle } from 'lucide-react';

// 这里应该替换为您的Stripe公钥
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js 尚未加载
      return;
    }

    if (error) {
      elements.getElement('card')?.focus();
      return;
    }

    if (!cardComplete) {
      setError('请完成信用卡信息填写');
      return;
    }

    setProcessing(true);

    // 在实际应用中，这里应该调用您的后端API来创建支付意图
    // 然后使用返回的客户端密钥确认支付
    // 以下是模拟的支付流程
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟成功支付
      setPaymentSuccess(true);
      setProcessing(false);
      
      // 通知父组件支付成功
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError('支付处理过程中出现错误');
      setProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">支付成功！</h3>
        <p className="text-gray-600 mb-6">感谢您的购买。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            id="name"
            type="text"
            placeholder="请输入您的姓名"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billingDetails.name}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            电子邮箱
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billingDetails.email}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">
            信用卡信息
          </label>
          <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              onChange={(e) => {
                setError(e.error ? e.error.message : null);
                setCardComplete(e.complete);
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          <AlertCircle className="inline-block w-4 h-4 mr-1" />
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={processing || !stripe}
          className={`flex-1 py-3 rounded-lg text-white font-medium ${processing || !stripe ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
        >
          {processing ? '处理中...' : `支付 ¥${amount.toFixed(2)}`}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          取消
        </button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>我们使用Stripe安全支付系统，您的支付信息受到保护。</p>
      </div>
    </form>
  );
};

interface StripePaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const StripePayment: React.FC<StripePaymentProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default StripePayment;