# 🌪️ TruthStorm AI

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-truthstorm.netlify.app-success?style=for-the-badge)](https://truthstorm.netlify.app/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-blueviolet?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**TruthStorm AI** is a professional-grade digital forensics and misinformation investigation platform. Submit a viral claim, image, or news link and receive a structured AI-generated credibility report in seconds — powered by **Google Gemini 1.5 Flash**.

🔗 **[View Live Platform → truthstorm.netlify.app](https://truthstorm.netlify.app/)**

---

## ✨ Features

### 🔍 Multimodal Investigation Engine
- **Image Analysis** — Upload an image or paste an image URL; the AI reads and interprets the visual content
- **Text Claim Verification** — Paste any viral statement, news headline, or forwarded message
- **Source URL Analysis** — Submit a news article link for automated credibility assessment
- **Combined Multimodal Scans** — Submit an image *and* a claim together for cross-reference analysis

### 🧠 AI-Powered Truth Engine
- **Credibility Score (0–100)** — A quantitative reliability index computed by Gemini
- **Verdict Labels** — `Likely True`, `Uncertain`, or `Likely False`
- **Key Findings Panel** — Transparent breakdown of observations and inconsistencies
- **Analysis Time Tracking** — Shows exactly how long each AI scan took
- **Anti-Hallucination Prompting** — Instructs the AI to be conservative and cite uncertainty
- **Time-Aware Analysis** — The AI is aware of the current date to avoid fabricating "latest" facts

### 📊 Investigation Dashboard
- **Private History** — All past investigations stored securely under your account
- **Paginated History** — 10 investigations per page with smooth Next/Prev navigation
- **Search & Filter** — Filter investigations by keyword or verdict type in real time
- **Expandable Cards** — Click to expand full AI reports inline without leaving the page
- **Delete Reports** — Remove specific investigations from your history

### 🔐 Authentication & Security
- **JWT-based Authentication** — Stateless, secure sessions via JSON Web Tokens
- **Protected Routes** — Dashboard and investigation pages gated behind auth
- **Per-user Data Isolation** — Every user's investigations are completely private

### 🎨 Premium UI/UX
- **Silicon Valley Bento Grid** — Data-dense aesthetic card layout
- **OLED Dark Mode** — Optimized dark theme with near-black backgrounds
- **Glassmorphism** — Subtle blur-and-transparency effects throughout
- **Micro-animations** — Smooth transitions, hover effects, and loading states
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **Custom Geometric Logo** — SVG-based brand identity built from scratch

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, React Router v7, Tailwind CSS v4, Vite 8 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **AI Engine** | Google Gemini 1.5 Flash (Multimodal) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Deployment** | Netlify (Frontend) · Render (Backend) |

---

## 🏗 Architecture

```
truthstorm/
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── components/     # Navbar, Logo, InvestigationCard, ProtectedRoute
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── pages/          # Home, Dashboard, Investigate, Login, Signup
│   │   └── services/       # api.js — centralized API calls
│   └── vercel.json         # SPA routing config for Vercel
│
└── backend/                # Node.js + Express REST API
    ├── controllers/        # authController, investigationController
    ├── middleware/         # authMiddleware (JWT guard)
    ├── models/             # User.js, Investigation.js (Mongoose schemas)
    ├── routes/             # authRoutes, investigationRoutes
    └── services/           # truthEngine.js — Gemini AI integration
```

**Request Flow:**
1. User submits a claim/image/URL on the Investigate page
2. Frontend sends an authenticated `POST` to `/api/investigations`
3. Truth Engine constructs a Gemini prompt with multimodal content
4. Gemini returns a structured JSON analysis (score, verdict, key findings)
5. Investigation is saved to MongoDB and returned to the frontend
6. Dashboard fetches paginated history via `GET /api/investigations?page=1&limit=10`

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI
- A [Google AI Studio](https://aistudio.google.com/) API key (free tier available)

### 1. Clone the repository
```bash
git clone https://github.com/rishi919-rgb/truthstorm.git
cd truthstorm
```

### 2. Configure the Backend
```bash
cd backend && npm install
```

Create `backend/.env`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_ai_api_key
```

```bash
node index.js
# Server running on http://localhost:5000
```

### 3. Configure the Frontend
```bash
cd ../frontend && npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
# App running on http://localhost:5173
```

---

## 🌐 Deployment

### Frontend (Netlify / Vercel)
Point your hosting to the `frontend/` directory with:

| Setting | Value |
| :--- | :--- |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Backend (Render / Railway)
Deploy the `backend/` directory as a Node.js web service and set the same `.env` variables in your provider's dashboard.

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/signup` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive a JWT |
| `POST` | `/api/investigations` | ✅ | Submit a new investigation for analysis |
| `GET` | `/api/investigations` | ✅ | Get paginated history (`?page=1&limit=10&search=&verdict=All`) |
| `DELETE` | `/api/investigations/:id` | ✅ | Delete a specific investigation |

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

Built with ⚡ by **Rishikesh Singh** — [GitHub @rishi919-rgb](https://github.com/rishi919-rgb)
