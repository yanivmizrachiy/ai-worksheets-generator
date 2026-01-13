import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WorksheetEditor } from './components/editor/WorksheetEditor';
import { WorksheetPreview } from './components/editor/WorksheetPreview';
import { AIGenerationPanel } from './components/editor/AIGenerationPanel';
import { TemplateSelector } from './components/editor/TemplateSelector';
import type { Worksheet } from './types/worksheet';

function App() {
  const [language, setLanguage] = useState<'he' | 'en'>('en');
  const [currentWorksheet, setCurrentWorksheet] = useState<Worksheet | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'he' : 'en'));
  };

  const handleWorksheetSelect = (worksheet: Worksheet) => {
    setCurrentWorksheet(worksheet);
  };

  const handleWorksheetChange = (worksheet: Worksheet) => {
    setCurrentWorksheet(worksheet);
  };

  const isHebrew = language === 'he';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" dir={isHebrew ? 'rtl' : 'ltr'}>
      <Header language={language} onLanguageToggle={handleLanguageToggle} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {!currentWorksheet ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4">
                {isHebrew 
                  ? 'ברוכים הבאים למחולל דפי העבודה המופעל בבינה מלאכותית' 
                  : 'Welcome to the AI-Powered Worksheet Generator'}
              </h2>
              <p className="text-lg text-blue-100 mb-4">
                {isHebrew
                  ? 'צור דפי עבודה מותאמים אישית במתמטיקה וגיאומטריה בקלות. השתמש בתבניות מוכנות או צור באמצעות Google AI Studio.'
                  : 'Create custom math and geometry worksheets with ease. Use ready-made templates or generate with Google AI Studio.'}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <span>{isHebrew ? 'יצירה באמצעות AI' : 'AI-Powered Generation'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <span>{isHebrew ? 'עורך אינטראקטיבי' : 'Interactive Editor'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📄</span>
                  <span>{isHebrew ? 'ייצוא ל-PDF' : 'PDF Export'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <span>{isHebrew ? 'תמיכה בעברית ו-RTL' : 'Hebrew RTL Support'}</span>
                </div>
              </div>
            </div>

            {/* Template Selector */}
            <TemplateSelector 
              language={language} 
              onSelectTemplate={handleWorksheetSelect}
            />

            {/* AI Generation Panel */}
            <AIGenerationPanel 
              language={language} 
              onWorksheetGenerated={handleWorksheetSelect}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => setCurrentWorksheet(null)}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              <span>{isHebrew ? '←' : '←'}</span>
              <span>{isHebrew ? 'חזרה לבחירת תבנית' : 'Back to Template Selection'}</span>
            </button>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'editor'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {isHebrew ? 'עורך' : 'Editor'}
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {isHebrew ? 'תצוגה מקדימה' : 'Preview'}
              </button>
            </div>

            {/* Content */}
            {activeTab === 'editor' ? (
              <WorksheetEditor
                worksheet={currentWorksheet}
                onChange={handleWorksheetChange}
                language={language}
              />
            ) : (
              <WorksheetPreview worksheet={currentWorksheet} language={language} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
