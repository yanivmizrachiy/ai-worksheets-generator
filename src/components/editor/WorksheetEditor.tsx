import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import type { Worksheet, Question } from '../../types/worksheet';
import { exportToPDF } from '../../utils/pdfExport';

interface WorksheetEditorProps {
  worksheet: Worksheet;
  onChange: (worksheet: Worksheet) => void;
  language: 'he' | 'en';
}

export const WorksheetEditor: React.FC<WorksheetEditorProps> = ({
  worksheet,
  onChange,
  language,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const isHebrew = language === 'he';

  const handleTitleChange = (title: string) => {
    onChange({ ...worksheet, title });
  };

  const handleInstructionsChange = (instructions: string) => {
    onChange({
      ...worksheet,
      content: {
        ...worksheet.content,
        instructions,
      },
    });
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...worksheet.content.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    onChange({
      ...worksheet,
      content: {
        ...worksheet.content,
        questions: newQuestions,
      },
    });
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'short-answer',
      text: isHebrew ? 'שאלה חדשה' : 'New Question',
      points: 10,
    };
    onChange({
      ...worksheet,
      content: {
        ...worksheet.content,
        questions: [...worksheet.content.questions, newQuestion],
      },
    });
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = worksheet.content.questions.filter((_, i) => i !== index);
    onChange({
      ...worksheet,
      content: {
        ...worksheet.content,
        questions: newQuestions,
      },
    });
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(worksheet, 'worksheet-preview');
    } catch (error) {
      console.error('Export failed:', error);
      alert(isHebrew ? 'ייצוא נכשל' : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Editor Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isHebrew ? 'עורך דפי עבודה' : 'Worksheet Editor'}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleAddQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {isHebrew ? 'הוסף שאלה' : 'Add Question'}
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              {isExporting 
                ? (isHebrew ? 'מייצא...' : 'Exporting...') 
                : (isHebrew ? 'ייצא ל-PDF' : 'Export PDF')}
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isHebrew ? 'כותרת' : 'Title'}
          </label>
          <input
            type="text"
            value={worksheet.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir={isHebrew ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Instructions Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isHebrew ? 'הוראות' : 'Instructions'}
          </label>
          <textarea
            value={worksheet.content.instructions || ''}
            onChange={(e) => handleInstructionsChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            dir={isHebrew ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      {/* Questions Editor */}
      <div className="space-y-4">
        {worksheet.content.questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {isHebrew ? `שאלה ${index + 1}` : `Question ${index + 1}`}
              </h3>
              <button
                onClick={() => handleDeleteQuestion(index)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isHebrew ? 'נוסח השאלה' : 'Question Text'}
                </label>
                <textarea
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  dir={isHebrew ? 'rtl' : 'ltr'}
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isHebrew ? 'תשובה' : 'Answer'}
                </label>
                <input
                  type="text"
                  value={question.answer || ''}
                  onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dir={isHebrew ? 'rtl' : 'ltr'}
                />
              </div>

              {/* Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isHebrew ? 'נקודות' : 'Points'}
                </label>
                <input
                  type="number"
                  value={question.points || 10}
                  onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value))}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
