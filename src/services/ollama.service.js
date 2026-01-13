import axios from 'axios';

export const generateText = async (prompt) => {
    try {
        //petición a la API de Ollama
        const response = await axios.post('http://localhost:11434/api/chat', {
            model: 'gemma2:2b', // en mi caso usaré gemma2:2b por ser un modelo más ligero pero con capacidades suficientes
            messages: [
                { role: 'user', content: prompt }
            ],
            stream: false // para que la respuesta de la IA sea solo una y no varios JSONs
        });
        return response.data.message.content;
    } catch (error) {
        throw new Error("No se pudo generar la respuesta de IA");
    }
};