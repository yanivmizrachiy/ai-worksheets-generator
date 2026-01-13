import type { Worksheet, GeometryQuestion } from '../../types/worksheet';

export const generateGeometryWorksheet = (
  difficulty: 'easy' | 'medium' | 'hard',
  numQuestions: number = 8,
  language: 'he' | 'en' = 'en'
): Worksheet => {
  const questions: GeometryQuestion[] = [];
  const shapes: Array<'circle' | 'triangle' | 'square' | 'rectangle'> = 
    ['circle', 'triangle', 'square', 'rectangle'];

  for (let i = 0; i < numQuestions; i++) {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const question = generateGeometryQuestion(i + 1, shape, difficulty, language);
    questions.push(question);
  }

  const title = language === 'he' ? 'דף עבודה בגיאומטריה' : 'Geometry Worksheet';
  const instructions = language === 'he' 
    ? 'חשב את השטח או ההיקף של הצורות הבאות. הראה את החישובים שלך.'
    : 'Calculate the area or perimeter of the following shapes. Show your calculations.';

  return {
    id: `geometry-${Date.now()}`,
    title,
    type: 'geometry',
    content: {
      questions,
      instructions,
    },
    language,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const generateGeometryQuestion = (
  id: number,
  shape: 'circle' | 'triangle' | 'square' | 'rectangle',
  difficulty: 'easy' | 'medium' | 'hard',
  language: 'he' | 'en'
): GeometryQuestion => {
  const maxDimension = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50;
  let text: string;
  let answer: string;
  let properties: Record<string, number> = {};

  const problemType = Math.random() > 0.5 ? 'area' : 'perimeter';

  switch (shape) {
    case 'circle': {
      const radius = Math.floor(Math.random() * maxDimension) + 1;
      properties = { radius };
      
      if (problemType === 'area') {
        const area = Math.PI * radius * radius;
        answer = area.toFixed(2);
        text = language === 'he'
          ? `חשב את שטח המעגל עם רדיוס ${radius} ס"מ`
          : `Calculate the area of a circle with radius ${radius} cm`;
      } else {
        const perimeter = 2 * Math.PI * radius;
        answer = perimeter.toFixed(2);
        text = language === 'he'
          ? `חשב את היקף המעגל עם רדיוס ${radius} ס"מ`
          : `Calculate the perimeter of a circle with radius ${radius} cm`;
      }
      break;
    }

    case 'square': {
      const side = Math.floor(Math.random() * maxDimension) + 1;
      properties = { side };
      
      if (problemType === 'area') {
        answer = (side * side).toString();
        text = language === 'he'
          ? `חשב את שטח הריבוע עם צלע ${side} ס"מ`
          : `Calculate the area of a square with side ${side} cm`;
      } else {
        answer = (4 * side).toString();
        text = language === 'he'
          ? `חשב את היקף הריבוע עם צלע ${side} ס"מ`
          : `Calculate the perimeter of a square with side ${side} cm`;
      }
      break;
    }

    case 'rectangle': {
      const length = Math.floor(Math.random() * maxDimension) + 1;
      const width = Math.floor(Math.random() * maxDimension) + 1;
      properties = { length, width };
      
      if (problemType === 'area') {
        answer = (length * width).toString();
        text = language === 'he'
          ? `חשב את שטח המستطיל עם אורך ${length} ס"מ ורוחב ${width} ס"מ`
          : `Calculate the area of a rectangle with length ${length} cm and width ${width} cm`;
      } else {
        answer = (2 * (length + width)).toString();
        text = language === 'he'
          ? `חשב את היקף המستטיל עם אורך ${length} ס"מ ורוחב ${width} ס"מ`
          : `Calculate the perimeter of a rectangle with length ${length} cm and width ${width} cm`;
      }
      break;
    }

    case 'triangle': {
      const base = Math.floor(Math.random() * maxDimension) + 1;
      const height = Math.floor(Math.random() * maxDimension) + 1;
      properties = { base, height };
      
      answer = ((base * height) / 2).toString();
      text = language === 'he'
        ? `חשב את שטח המשולש עם בסיס ${base} ס"מ וגובה ${height} ס"מ`
        : `Calculate the area of a triangle with base ${base} cm and height ${height} cm`;
      break;
    }

    default:
      text = '';
      answer = '0';
  }

  return {
    id: `${id}`,
    type: 'geometry-problem',
    text,
    answer,
    points: 10,
    shape,
    properties,
  };
};

export const getGeometryTemplateNames = (language: 'he' | 'en') => {
  if (language === 'he') {
    return {
      circle: 'מעגל',
      triangle: 'משולש',
      square: 'ריבוע',
      rectangle: 'מלבן',
      mixed: 'צורות מעורבות',
    };
  }
  return {
    circle: 'Circle',
    triangle: 'Triangle',
    square: 'Square',
    rectangle: 'Rectangle',
    mixed: 'Mixed Shapes',
  };
};
