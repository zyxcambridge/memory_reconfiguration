import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/openai', async (req, res) => {
  try {
    const { situation, model, systemPrompt } = req.body;
    
    const prompt = `你是一个职场危机应对专家。请根据以下情况生成法律、心理和行动三方面的建议：\n"${situation}"\n\n要求：\n1. 法律建议：3条具体可操作的法律保护措施\n2. 心理支持：3条缓解心理压力的方法\n3. 行动方案：3个立即执行的步骤\n\n请以JSON格式返回：{"legal": [], "psychological": [], "action": []}`;

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    if (response.choices?.[0]?.message?.content) {
      res.json(JSON.parse(response.choices[0].message.content));
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'API调用失败' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});