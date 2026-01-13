# AI Worksheet Generator 📝✨

AI-Powered Worksheet Generator with GitHub Copilot & Google AI Studio integration. Full permissions for automated worksheet creation, editing, and PDF export. | מחולל דפי עבודה מבוסס AI עם הרשאות מלאות

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-000000?style=flat&logo=github&logoColor=white)

## ✨ Features

- 🤖 **AI-Powered Generation**: Generate worksheets using Google AI Studio (Gemini)
- �� **Interactive Editor**: Full-featured editor with question management
- 📄 **PDF Export**: Export worksheets to high-quality PDF files
- 🌍 **Hebrew RTL Support**: Complete support for Hebrew language and right-to-left text
- 📐 **Math & Geometry Templates**: Production-ready templates for various difficulty levels
- 🎨 **Modern UI**: Beautiful interface built with React and Tailwind CSS
- ⚡ **Fast & Responsive**: Built with Vite for optimal performance
- 🚀 **Automated Deployment**: CI/CD with GitHub Actions
- 💻 **GitHub Copilot Ready**: Optimized for AI-assisted development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google AI Studio API key (free from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yanivmizrachiy/ai-worksheets-generator.git
cd ai-worksheets-generator
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

## 🛠️ Usage

### Using Ready-Made Templates

1. Select a template from the "Ready-Made Templates" section
2. Choose difficulty level (Easy, Medium, or Hard)
3. Select type (Math or Geometry)
4. The worksheet will be generated instantly

### Using AI Generation

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Enter your API key in the "AI Generation" panel
3. Configure your worksheet:
   - Select type (Math, Geometry, or Custom)
   - Enter topic/subject
   - Choose difficulty level
   - Set number of questions
4. Click "Generate Worksheet"
5. Edit the generated worksheet in the editor

### Editing Worksheets

1. Use the "Editor" tab to modify:
   - Worksheet title
   - Instructions
   - Questions and answers
   - Points per question
2. Add or remove questions as needed
3. Preview your changes in real-time

### Exporting to PDF

1. Review your worksheet in the "Preview" tab
2. Click "Export PDF" button
3. The PDF will be downloaded automatically

## 🏗️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini)
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 Project Structure

\`\`\`
ai-worksheets-generator/
├── src/
│   ├── components/
│   │   ├── editor/          # Worksheet editor components
│   │   ├── layout/          # Header, Footer components
│   │   └── templates/       # Worksheet templates
│   ├── services/            # AI service integration
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── .vscode/                 # VS Code settings & extensions
├── .github/workflows/       # GitHub Actions workflows
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
\`\`\`

## 🧪 Development

### Available Scripts

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
\`\`\`

## 🤝 GitHub Copilot Integration

This project is optimized for GitHub Copilot development:

- Full TypeScript type definitions
- Clear component structure
- Comprehensive inline documentation
- Copilot-friendly naming conventions

### Recommended VS Code Extensions

- GitHub Copilot
- GitHub Copilot Chat
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript

## 🌐 Deployment

The application is automatically deployed to GitHub Pages on every push to the \`main\` branch.

### Manual Deployment

\`\`\`bash
# Build the application
npm run build

# The dist/ folder contains the production build
\`\`\`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using GitHub Copilot
- Powered by Google AI Studio (Gemini)
- Inspired by educators worldwide

## 🔗 Links

- [Google AI Studio](https://aistudio.google.com/)
- [GitHub Copilot](https://github.com/features/copilot)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ by [Yaniv Mizrachiy](https://github.com/yanivmizrachiy)
