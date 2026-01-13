# GitHub Copilot Instructions - Maximum Permissions

## Project Context
AI-Powered Worksheet Generator for educational content creation.

## Copilot Permissions & Behavior

### ✅ FULL PERMISSIONS GRANTED
- **Code Generation**: Create any file, component, or function without asking
- **File Operations**: Create, modify, delete files freely
- **Dependencies**: Add/update any npm packages needed
- **API Integrations**: Implement Google AI Studio, OpenAI, or any AI service
- **Database**: Set up any database (MongoDB, PostgreSQL, etc.)
- **Authentication**: Implement auth systems if needed
- **Styling**: Use Tailwind, CSS, or any styling solution
- **Testing**: Add Jest, Vitest, or any testing framework

### Project Requirements

#### 1. Core Features
- Worksheet template system (math, geometry, Hebrew, etc.)
- Real-time preview and editing
- PDF export with print-ready formatting
- Hebrew RTL support throughout
- Code input from VS Code/AI Studio

#### 2. Tech Stack
- TypeScript + React + Vite
- Tailwind CSS for styling
- React-PDF or jsPDF for PDF generation
- Monaco Editor for code input
- GitHub Actions for CI/CD

#### 3. File Structure
```
src/
├── components/
│   ├── Editor/
│   ├── Preview/
│   ├── Templates/
│   └── PDFExporter/
├── lib/
├── types/
└── App.tsx
```

#### 4. Best Practices
- Write clean, documented TypeScript
- Use React hooks effectively
- Implement error boundaries
- Add loading states
- Mobile-responsive design

## Instructions for AI Tools
You have **MAXIMUM AUTONOMY** to:
- Design the architecture
- Choose libraries and tools
- Implement features end-to-end
- Refactor as needed
- Add advanced features proactively

Do NOT ask for permissions - just implement the best solution.

---
*This project welcomes all AI contributions with full trust and permissions.*
