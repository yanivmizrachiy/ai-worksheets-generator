import React, { useState } from 'react';
import { Sparkles, Key, AlertCircle } from 'lucide-react';
import { aiService } from '../../services/aiService';
import type { GenerationPrompt } from '../../types/ai';
import type { Worksheet } from '../../types/worksheet';

interface AIGenerationPanelProps {
  language: 'he' | 'en';
  onWorksheetGenerated: (worksheet: Worksheet) => void;
}

export const AIGenerationPanel: React.FC<AIGenerationPanelProps> = ({
  language,
  onWorksheetGenerated,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [prompt, setPrompt] = useState<GenerationPrompt>({
    type: 'math',
    topic: '',
    difficulty: 'medium',
    numQuestions: 10,
    language,
  });

  const isHebrew = language === 'he';

  const handleInitialize = () => {
    if (!apiKey.trim()) {
      setError(isHebrew ? 'אנא הזן מפתח API' : 'Please enter an API key');
      return;
    }

    const success = aiService.initialize(apiKey);
    if (success) {
      setIsInitialized(true);
      setError(null);
      // Save to localStorage for convenience
      localStorage.setItem('gemini_api_key', apiKey);
    } else {
      setError(isHebrew ? 'אתחול נכשל' : 'Initialization failed');
    }
  };

  const handleGenerate = async () => {
    if (!isInitialized) {
      setError(isHebrew ? 'אנא אתחל את שירות ה-AI תחילה' : 'Please initialize AI service first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await aiService.generateWorksheet({
        ...prompt,
        language,
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      // Parse the AI response and create a worksheet
      try {
        // Extract JSON from markdown code blocks if present
        let jsonStr = response.content;
        const jsonMatch = response.content.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonStr = jsonMatch[1];
        }

        const parsed = JSON.parse(jsonStr);
        
        const worksheet: Worksheet = {
          id: `ai-${Date.now()}`,
          title: parsed.title || (isHebrew ? 'דף עבודה חדש' : 'New Worksheet'),
          type: prompt.type,
          content: {
            questions: parsed.questions || [],
            instructions: parsed.instructions,
          },
          language,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        onWorksheetGenerated(worksheet);
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        setError(isHebrew 
          ? 'לא ניתן לנתח את התגובה מה-AI. נסה שוב.' 
          : 'Failed to parse AI response. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Try to load saved API key on mount
  React.useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      const success = aiService.initialize(savedKey);
      if (success) {
        setIsInitialized(true);
      }
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {isHebrew ? 'יצירה באמצעות AI' : 'AI Generation'}
        </h2>
      </div>

      {!isInitialized ? (
        <div className="space-y-4">
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
            <p className="text-sm text-blue-800">
              {isHebrew 
                ? 'קבל מפתח API חינמי מ-Google AI Studio:' 
                : 'Get a free API key from Google AI Studio:'}
              {' '}
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline hover:text-blue-900"
              >
                aistudio.google.com/app/apikey
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isHebrew ? 'מפתח Google AI API' : 'Google AI API Key'}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={isHebrew ? 'הזן מפתח API' : 'Enter API key'}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleInitialize}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {isHebrew ? 'אתחל' : 'Initialize'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-sm text-green-800 font-medium">
              ✓ {isHebrew ? 'שירות AI מוכן' : 'AI service ready'}
            </p>
          </div>

          {/* Worksheet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isHebrew ? 'סוג דף העבודה' : 'Worksheet Type'}
            </label>
            <select
              value={prompt.type}
              onChange={(e) => setPrompt({ ...prompt, type: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="math">{isHebrew ? 'מתמטיקה' : 'Math'}</option>
              <option value="geometry">{isHebrew ? 'גיאומטריה' : 'Geometry'}</option>
              <option value="custom">{isHebrew ? 'מותאם אישית' : 'Custom'}</option>
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isHebrew ? 'נושא' : 'Topic'}
            </label>
            <input
              type="text"
              value={prompt.topic}
              onChange={(e) => setPrompt({ ...prompt, topic: e.target.value })}
              placeholder={isHebrew ? 'לדוגמה: חיבור וחיסור' : 'e.g., Addition and Subtraction'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              dir={isHebrew ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isHebrew ? 'רמת קושי' : 'Difficulty'}
            </label>
            <select
              value={prompt.difficulty}
              onChange={(e) => setPrompt({ ...prompt, difficulty: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="easy">{isHebrew ? 'קל' : 'Easy'}</option>
              <option value="medium">{isHebrew ? 'בינוני' : 'Medium'}</option>
              <option value="hard">{isHebrew ? 'קשה' : 'Hard'}</option>
            </select>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isHebrew ? 'מספר שאלות' : 'Number of Questions'}
            </label>
            <input
              type="number"
              value={prompt.numQuestions}
              onChange={(e) => setPrompt({ ...prompt, numQuestions: parseInt(e.target.value) })}
              min="1"
              max="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            {isGenerating 
              ? (isHebrew ? 'יוצר...' : 'Generating...') 
              : (isHebrew ? 'צור דף עבודה' : 'Generate Worksheet')}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
