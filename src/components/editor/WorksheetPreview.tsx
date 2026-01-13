import React from 'react';
import type { Worksheet } from '../../types/worksheet';

interface WorksheetPreviewProps {
  worksheet: Worksheet;
  language: 'he' | 'en';
}

export const WorksheetPreview: React.FC<WorksheetPreviewProps> = ({
  worksheet,
  language,
}) => {
  const isHebrew = language === 'he';

  return (
    <div 
      id="worksheet-preview"
      className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
      dir={isHebrew ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {worksheet.title}
        </h1>
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <span className="font-medium">{isHebrew ? 'תאריך:' : 'Date:'}</span>
            <span className="ml-2">_______________</span>
          </div>
          <div>
            <span className="font-medium">{isHebrew ? 'שם:' : 'Name:'}</span>
            <span className="ml-2">_______________</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {worksheet.content.instructions && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-gray-700 font-medium mb-1">
            {isHebrew ? 'הוראות:' : 'Instructions:'}
          </p>
          <p className="text-gray-600">{worksheet.content.instructions}</p>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {worksheet.content.questions.map((question, index) => (
          <div 
            key={question.id} 
            className="border-l-2 border-gray-300 pl-4 py-2"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <span className="font-bold text-gray-900">
                  {isHebrew ? `${index + 1}.` : `${index + 1}.`}
                </span>
                <span className="ml-2 text-gray-800">{question.text}</span>
              </div>
              {question.points && (
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {question.points} {isHebrew ? 'נק׳' : 'pts'}
                </span>
              )}
            </div>

            {/* Answer space for multiple choice */}
            {question.type === 'multiple-choice' && question.options && (
              <div className="mt-3 space-y-2 mr-6">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center">
                    <span className="w-6 h-6 border-2 border-gray-400 rounded-full mr-3"></span>
                    <span className="text-gray-700">{option}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Answer space for other types */}
            {question.type !== 'multiple-choice' && (
              <div className="mt-3">
                <div className="border-b-2 border-gray-300 min-h-[60px]"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center text-sm text-gray-500">
        <p>{isHebrew ? 'בהצלחה!' : 'Good luck!'}</p>
      </div>
    </div>
  );
};
