const { callOpenAI } = require('../services/openaiService');

// POST /api/what-if
const generateWhatIf = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const alternateHistory = await callOpenAI(text);
    res.json({ alternateHistory });
  } catch (error) {
    console.error('Error generating what-if scenario:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { generateWhatIf };
