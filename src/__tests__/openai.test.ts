import { main } from '../path/to/your/module'; // <-- Replace with the correct path to your module
import OpenAI from 'openai';

jest.mock('openai');

const mockedCreate = jest.fn().mockResolvedValue({
  choices: [{ message: { content: "The capital of Spain is Madrid." } }]
});

(OpenAI as jest.Mock).mockImplementation(() => ({
  chat: {
    completions: {
      create: mockedCreate
    }
  }
}));

describe('main function', () => {
  it('should call OpenAI API and log the correct response', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await main();

    expect(mockedCreate).toHaveBeenCalledWith({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is the capital of France?" },
        { role: "assistant", content: "The capital of France is Paris." },
        { role: "user", content: "What about Spain?" }
      ],
      model: "gpt-4o"
    });

    expect(consoleSpy).toHaveBeenCalledWith("The capital of Spain is Madrid.");

    consoleSpy.mockRestore();
  });
});
