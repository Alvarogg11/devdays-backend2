import { generateText } from '../services/ollama.service.js' ; //he quitado openai.service.js para probar ollama (por ver cómo hacer con ambos)

export const generateAIResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await generateText(prompt);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        res.status(error).json({ message: error.message });
    }
};