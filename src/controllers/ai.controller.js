import { generateText } from '../services/ollama.service.js' ; 

export const generateAIResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await generateText(prompt);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};