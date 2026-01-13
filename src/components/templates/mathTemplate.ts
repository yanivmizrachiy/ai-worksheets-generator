import type { Worksheet, MathQuestion } from '../../types/worksheet';

export const generateMathWorksheet = (
  difficulty: 'easy' | 'medium' | 'hard',
  numQuestions: number = 10,
  language: 'he' | 'en' = 'en'
): Worksheet => {
  const questions: MathQuestion[] = [];
  const operations: Array<'addition' | 'subtraction' | 'multiplication' | 'division'> = 
    ['addition', 'subtraction', 'multiplication', 'division'];

  for (let i = 0; i < numQuestions; i++) {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const question = generateMathQuestion(i + 1, operation, difficulty);
    questions.push(question);
  }

  const title = language === 'he' ? 'דף עבודה במתמטיקה' : 'Math Worksheet';
  const instructions = language === 'he' 
    ? 'פתור את התרגילים הבאים. הראה את העבודה שלך.'
    : 'Solve the following problems. Show your work.';

  return {
    id: `math-${Date.now()}`,
    title,
    type: 'math',
    content: {
      questions,
      instructions,
    },
    language,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const generateMathQuestion = (
  id: number,
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division',
  difficulty: 'easy' | 'medium' | 'hard'
): MathQuestion => {
  let operands: number[];
  let answer: number;
  let symbol: string;

  const maxNum = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 100 : 1000;

  switch (operation) {
    case 'addition':
      operands = [
        Math.floor(Math.random() * maxNum) + 1,
        Math.floor(Math.random() * maxNum) + 1,
      ];
      answer = operands[0] + operands[1];
      symbol = '+';
      break;
    case 'subtraction':
      operands = [
        Math.floor(Math.random() * maxNum) + 1,
        Math.floor(Math.random() * (maxNum / 2)) + 1,
      ];
      operands.sort((a, b) => b - a); // Ensure first number is larger
      answer = operands[0] - operands[1];
      symbol = '-';
      break;
    case 'multiplication': {
      const multMax = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50;
      operands = [
        Math.floor(Math.random() * multMax) + 1,
        Math.floor(Math.random() * multMax) + 1,
      ];
      answer = operands[0] * operands[1];
      symbol = '×';
      break;
    }
    case 'division': {
      const divisor = Math.floor(Math.random() * (maxNum / 10)) + 1;
      const quotient = Math.floor(Math.random() * (maxNum / 10)) + 1;
      operands = [divisor * quotient, divisor];
      answer = quotient;
      symbol = '÷';
      break;
    }
    default:
      operands = [1, 1];
      answer = 2;
      symbol = '+';
  }

  const text = `${operands[0]} ${symbol} ${operands[1]} = ?`;

  return {
    id: `${id}`,
    type: 'calculation',
    text,
    answer: answer.toString(),
    points: 10,
    operation,
    operands,
  };
};

export const getMathTemplateNames = (language: 'he' | 'en') => {
  if (language === 'he') {
    return {
      addition: 'חיבור',
      subtraction: 'חיסור',
      multiplication: 'כפל',
      division: 'חילוק',
      mixed: 'מעורב',
    };
  }
  return {
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
    mixed: 'Mixed Operations',
  };
};
