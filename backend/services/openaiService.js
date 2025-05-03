const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const callOpenAI = async (text) => {
  const prompt = `
Imagine an alternate history based on the following event:

"${text}"

Generate a timeline of major events that would happen differently.
Respond as a list like:

- 1945: Event A
- 1950: Event B
- 1960: Event C
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in historical counterfactuals.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const message = response.choices[0]?.message?.content?.trim();
    return message || 'No alternate history generated.';
  } catch (error) {
    console.error('OpenAI error:', error);
    throw error;
  }
};

module.exports = { callOpenAI };
