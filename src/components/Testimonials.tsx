import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      content: '在遇到职场困境时，这个平台给了我很大的帮助。专业的法律建议让我明白了自己的权益，最终成功解决了问题。',
      author: '李女士',
      title: 'IT行业从业者',
    },
    {
      content: '心理咨询师的建议帮助我走出了困境，重新找回了自信。现在我学会了如何更好地应对职场压力。',
      author: '张先生',
      title: '金融行业从业者',
    },
    {
      content: '系统提供的行动方案非常实用，每一步都很清晰。让我在面对困难时不再手足无措。',
      author: '王女士',
      title: '教育行业从业者',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            用户反馈
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            听听其他用户是如何通过我们的服务解决职场危机的
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <div className="mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                {testimonial.content}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;