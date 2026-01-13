import React from 'react';
import { Calculator, Shapes } from 'lucide-react';
import { generateMathWorksheet } from '../templates/mathTemplate';
import { generateGeometryWorksheet } from '../templates/geometryTemplate';
import type { Worksheet } from '../../types/worksheet';

interface TemplateSelectorProps {
  language: 'he' | 'en';
  onSelectTemplate: (worksheet: Worksheet) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  language,
  onSelectTemplate,
}) => {
  const isHebrew = language === 'he';

  const templates = [
    {
      id: 'math-easy',
      title: isHebrew ? 'מתמטיקה - קל' : 'Math - Easy',
      description: isHebrew ? 'תרגילי חשבון בסיסיים' : 'Basic arithmetic problems',
      icon: Calculator,
      color: 'blue',
      generate: () => generateMathWorksheet('easy', 10, language),
    },
    {
      id: 'math-medium',
      title: isHebrew ? 'מתמטיקה - בינוני' : 'Math - Medium',
      description: isHebrew ? 'תרגילי חשבון מתקדמים' : 'Advanced arithmetic problems',
      icon: Calculator,
      color: 'green',
      generate: () => generateMathWorksheet('medium', 10, language),
    },
    {
      id: 'math-hard',
      title: isHebrew ? 'מתמטיקה - קשה' : 'Math - Hard',
      description: isHebrew ? 'תרגילי חשבון מאתגרים' : 'Challenging arithmetic problems',
      icon: Calculator,
      color: 'purple',
      generate: () => generateMathWorksheet('hard', 10, language),
    },
    {
      id: 'geometry-easy',
      title: isHebrew ? 'גיאומטריה - קל' : 'Geometry - Easy',
      description: isHebrew ? 'תרגילי צורות בסיסיים' : 'Basic shape problems',
      icon: Shapes,
      color: 'orange',
      generate: () => generateGeometryWorksheet('easy', 8, language),
    },
    {
      id: 'geometry-medium',
      title: isHebrew ? 'גיאומטריה - בינוני' : 'Geometry - Medium',
      description: isHebrew ? 'תרגילי צורות מתקדמים' : 'Advanced shape problems',
      icon: Shapes,
      color: 'pink',
      generate: () => generateGeometryWorksheet('medium', 8, language),
    },
    {
      id: 'geometry-hard',
      title: isHebrew ? 'גיאומטריה - קשה' : 'Geometry - Hard',
      description: isHebrew ? 'תרגילי צורות מאתגרים' : 'Challenging shape problems',
      icon: Shapes,
      color: 'red',
      generate: () => generateGeometryWorksheet('hard', 8, language),
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; hover: string; icon: string }> = {
      blue: { bg: 'bg-blue-100', hover: 'hover:bg-blue-200', icon: 'text-blue-600' },
      green: { bg: 'bg-green-100', hover: 'hover:bg-green-200', icon: 'text-green-600' },
      purple: { bg: 'bg-purple-100', hover: 'hover:bg-purple-200', icon: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', hover: 'hover:bg-orange-200', icon: 'text-orange-600' },
      pink: { bg: 'bg-pink-100', hover: 'hover:bg-pink-200', icon: 'text-pink-600' },
      red: { bg: 'bg-red-100', hover: 'hover:bg-red-200', icon: 'text-red-600' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {isHebrew ? 'תבניות מוכנות' : 'Ready-Made Templates'}
      </h2>
      <p className="text-gray-600 mb-6">
        {isHebrew 
          ? 'בחר תבנית מוכנה ליצירת דף עבודה מיידי' 
          : 'Select a ready-made template to create an instant worksheet'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const colors = getColorClasses(template.color);
          const Icon = template.icon;

          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.generate())}
              className={`${colors.bg} ${colors.hover} rounded-lg p-6 transition-all hover:shadow-md text-left`}
            >
              <div className="flex items-start gap-3">
                <div className={`${colors.icon} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
