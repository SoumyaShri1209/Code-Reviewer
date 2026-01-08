## 🧠 AI Code Reviewer

An AI-powered code reviewer that analyzes source code and provides concise, senior-level feedback focused on correctness, performance, readability, and best practices. The goal is to help developers quickly identify issues and improve code quality without overwhelming explanations.

### ✨ Features
- Detects bugs, logical errors, and edge cases  
- Suggests clear fixes and meaningful improvements  
- Focuses on clean, maintainable, production-quality code  
- Behaves like a senior developer (7+ years experience)  
- Provides structured, easy-to-read feedback (Errors → Fixes → Improvements)

### 🛠 Tech Stack
Frontend: React, react-simple-code-editor, PrismJS, react-markdown  
Backend: Node.js, Express, Gemini API (Google Generative AI)

### 🚀 How It Works
Paste your code into the editor, click **Review**, and the AI analyzes your code to return only necessary feedback with actionable suggestions.

### ⚙️ Setup
1. Clone the repository  
2. Install dependencies using `npm install`  
3. Create a `.env` file in the backend and add:
   `GEMINI_API_KEY=your_api_key_here`  
4. Run the project using `npm run dev`

### 📌 Notes
- Uses Gemini free tier (API quotas apply)  
- If quota is exceeded, retry later or enable billing  
- Designed for learning, reviewing, and improving code quality

### 🎯 Goal
Deliver high-quality, short, and practical code reviews that feel like feedback from a senior engineer.
