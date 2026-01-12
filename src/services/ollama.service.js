import axios from 'axios';

export const generateText = async (prompt) => {
    try {
        //petición a la API de Ollama
        const response = await axios.post('http://localhost:11434/api/chat', {
            model: 'gemma2:2b', // por comprobar si funciona poniendo :2b
            messages: [
                { role: 'user', content: prompt }
            ],
            stream: false // Importante: para recibir la respuesta de una sola vez (perdón?)
        });
        return response.data.message.content;
    } catch (error) {
        console.error("Error conectando con Ollama:", error.message);
        throw new Error("No se pudo generar la respuesta de IA");
    }
};