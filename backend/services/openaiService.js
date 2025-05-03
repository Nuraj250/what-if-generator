const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const callOpenAI = async (text) => {
  const smartPrompt = `
You are a world-class historian and alternate reality expert.

Given the following historical event:

"${text}"

1. First, assume the event DID NOT happen as it did.
2. Predict a step-by-step timeline of what would happen differently.
3. Timeline format must be YEAR: EVENT (one line each).
4. Cover at least 5 major changes and their ripple effects.
5. Keep it concise but logical.
6. Return only the timeline in clean plain text, no extra explanations.

EXAMPLE:
- 1912: Titanic successfully reaches New York, boosting maritime travel trust.
- 1915: White Star Line becomes the dominant shipping company.
- 1920: Advances in shipbuilding technologies accelerate.
- 1930: Airplane travel adoption slows by a decade.
- 1940: Different alliances form during World War II.

BEGIN.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You generate alternate historical timelines based on user events.'
        },
        {
          role: 'user',
          content: smartPrompt
        }
      ],
      temperature: 0.6,
      max_tokens: 600,
    });

    const message = response.choices[0]?.message?.content?.trim();
    return message || 'No alternate history generated.';
  } catch (error) {
    console.error('OpenAI error:', error);
    throw error;
  }
};

module.exports = { callOpenAI };
