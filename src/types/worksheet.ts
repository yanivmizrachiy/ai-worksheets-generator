export interface Worksheet {
  id: string;
  title: string;
  type: WorksheetType;
  content: WorksheetContent;
  language: 'he' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

export type WorksheetType = 'math' | 'geometry' | 'custom';

export interface WorksheetContent {
  questions: Question[];
  instructions?: string;
  metadata?: Record<string, any>;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  answer?: string;
  options?: string[];
  image?: string;
  points?: number;
}

export type QuestionType = 
  | 'multiple-choice'
  | 'short-answer'
  | 'calculation'
  | 'geometry-problem'
  | 'fill-in-blank';

export interface MathQuestion extends Question {
  type: 'calculation';
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
  operands: number[];
}

export interface GeometryQuestion extends Question {
  type: 'geometry-problem';
  shape: 'circle' | 'triangle' | 'square' | 'rectangle' | 'polygon';
  properties?: Record<string, number>;
}
