import React from 'react';
import { FileText, Github } from 'lucide-react';

interface HeaderProps {
  language: 'he' | 'en';
  onLanguageToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageToggle }) => {
  const isHebrew = language === 'he';

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {isHebrew ? 'מחולל דפי עבודה AI' : 'AI Worksheet Generator'}
              </h1>
              <p className="text-sm text-blue-100">
                {isHebrew 
                  ? 'מופעל על ידי Google AI Studio' 
                  : 'Powered by Google AI Studio'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLanguageToggle}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm font-medium"
            >
              {isHebrew ? 'English' : 'עברית'}
            </button>
            
            <a
              href="https://github.com/yanivmizrachiy/ai-worksheets-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
