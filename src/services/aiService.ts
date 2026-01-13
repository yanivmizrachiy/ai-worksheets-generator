import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenerationPrompt, AIResponse } from '../types/ai';

class AIService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  initialize(apiKey: string) {
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      return true;
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
      return false;
    }
  }

  async generateWorksheet(prompt: GenerationPrompt): Promise<AIResponse> {
    if (!this.model) {
      return {
        content: '',
        error: 'AI service not initialized. Please provide an API key.',
      };
    }

    try {
      const promptText = this.buildPrompt(prompt);
      const result = await this.model.generateContent(promptText);
      const response = await result.response;
      const text = response.text();

      return {
        content: text,
      };
    } catch (error) {
      console.error('Error generating worksheet:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private buildPrompt(prompt: GenerationPrompt): string {
    const { type, topic, difficulty, numQuestions, language, additionalInstructions } = prompt;
    
    let promptText = `Generate a ${type} worksheet`;
    
    if (topic) {
      promptText += ` about ${topic}`;
    }
    
    if (difficulty) {
      promptText += ` with ${difficulty} difficulty level`;
    }
    
    if (numQuestions) {
      promptText += ` containing ${numQuestions} questions`;
    }
    
    if (language === 'he') {
      promptText += '. The worksheet should be in Hebrew with proper RTL formatting.';
    } else {
      promptText += '. The worksheet should be in English.';
    }
    
    if (additionalInstructions) {
      promptText += `\n\nAdditional instructions: ${additionalInstructions}`;
    }
    
    promptText += '\n\nFormat the output as a JSON object with the following structure:';
    promptText += '\n```json\n{';
    promptText += '\n  "title": "Worksheet Title",';
    promptText += '\n  "instructions": "Instructions for students",';
    promptText += '\n  "questions": [';
    promptText += '\n    {';
    promptText += '\n      "id": "1",';
    promptText += '\n      "type": "multiple-choice|short-answer|calculation|geometry-problem|fill-in-blank",';
    promptText += '\n      "text": "Question text",';
    promptText += '\n      "answer": "Correct answer",';
    promptText += '\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"] (for multiple-choice only),';
    promptText += '\n      "points": 10';
    promptText += '\n    }';
    promptText += '\n  ]';
    promptText += '\n}';
    promptText += '\n```';
    
    return promptText;
  }

  isInitialized(): boolean {
    return this.model !== null;
  }
}

export const aiService = new AIService();
