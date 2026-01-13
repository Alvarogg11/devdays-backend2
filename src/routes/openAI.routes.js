import { generateAIResponse } from '../controllers/ai.controller.js';
import { Router } from 'express';

const openAIrouter = Router();

openAIrouter.post('/openAI/chat', generateAIResponse);

export { openAIrouter };