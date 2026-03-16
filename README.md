# 🌪️ TruthStorm AI — Multimodal Viral Content Investigation

[![Gemini AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-blueviolet?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![Vercel Design](https://img.shields.io/badge/Design-Silicon%20Valley%20SaaS-000000?style=for-the-badge)](https://vercel.com/design)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)](https://www.mongodb.com/mern-stack)

**TruthStorm AI** is a professional-grade digital forensics and investigation platform designed to dismantle misleading viral narratives. By combining **multimodal AI analysis** with a **Silicon Valley "Bento" aesthetic**, it empowers users to verify claims, images, and sources in seconds.

---

## ⚡ Key Capabilities

### 🔍 Multimodal Investigation
Unlike standard fact-checkers, TruthStorm analyzes the *relationship* between visual evidence and textual claims.
- **Image Contextualization**: Detects reused images and identifies the original geographical/historical context.
- **Claim Verification**: Cross-references viral statements against known facts and current events.
- **Sentiment & Bias Detection**: Identifies emotionally charged or misleading language patterns.

### 🧠 The Truth Engine
Powered by **Google Gemini 1.5 Flash**, our engine generates:
- **Credibility Score (0-100)**: A quantitative measure of information reliability.
- **Verdict Labels**: Instant classification (Likely True, Misleading, Context Mismatch, etc.).
- **Structured Findings**: Transparent breakdowns of Observation, Inconsistency, and Conclusion.

### 🎨 Premium "SaaS" Experience
- **Bento-Grid Dashboard**: A data-driven, aesthetic layout for managing all your investigations.
- **Glassmorphic UI**: Ultra-modern design with dynamic blur effects and OLED-optimized dark mode.
- **Analysis Time Metrics**: Real-time performance tracking for every AI scan.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS v4 |
| **Backend** | Node.js, Express |
| **Database** | MongoDB Atlas |
| **AI Engine** | Google Gemini (Multimodal Pro) |
| **Authentication** | JWT + Context API |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rishi919-rgb/truthstorm.git
cd truthstorm
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_ai_key
```

### 3. Install Dependencies
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 4. Run the Platform
```bash
# Start backend
node index.js

# Start frontend
cd ../frontend && npm run dev
```

---

## 🎯 Architecture

The system uses a highly responsive **Event-Driven Analysis** flow:
1. **Evidence Intake**: User submits URL, Context, or Image.
2. **Contextual Buffering**: Evidence is pre-processed for AI readiness.
3. **Engine Execution**: Gemini Multimodal analysis cross-references live data.
4. **Report Rendering**: Results are delivered via a high-fidelity investigative dashboard.

---

Built with ⚡ by **Discrete Syndicates** for the Hackathon.

TruthStorm AI aims to empower users to verify information before sharing it online, helping reduce the spread of misinformation.