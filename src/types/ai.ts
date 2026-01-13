export interface AIConfig {
  apiKey: string;
  model?: string;
}

export interface GenerationPrompt {
  type: 'math' | 'geometry' | 'custom';
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  numQuestions?: number;
  language?: 'he' | 'en';
  additionalInstructions?: string;
}

export interface AIResponse {
  content: string;
  error?: string;
}
