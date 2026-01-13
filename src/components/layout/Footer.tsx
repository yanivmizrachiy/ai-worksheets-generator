import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm">
              © {new Date().getFullYear()} AI Worksheet Generator
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Built with React, TypeScript, Vite & Tailwind CSS
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>using GitHub Copilot</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
