# TruthStorm Startup Guide

## Quick Start

### Method 1: Simple Start
```bash
start_all.bat
```
This will start both backend and frontend servers with basic setup.

### Method 2: Enhanced Start (Recommended)
```bash
start_all_enhanced.bat
```
This includes:
- Dependency checking and installation
- Server health checks
- Error handling
- Interactive menu options

### Method 3: Stop All Servers
```bash
stop_all.bat
```
This will stop all running Node.js processes.

## Manual Start (Alternative)

### Backend
```bash
cd backend
set PORT=5001
node index.js
```

### Frontend
```bash
cd frontend
npm run dev
```

## URLs
- **Frontend**: http://localhost:5173 (or http://localhost:5174)
- **Backend API**: http://localhost:5001

## Requirements
- Node.js installed
- Internet connection (for Google Gemini API)
- MongoDB connection (configured in .env)

## Troubleshooting

### Port Conflicts
If you get port conflicts:
- Backend: Change `PORT=5001` to another port
- Frontend: Vite will automatically find next available port

### Dependencies Issues
Run the enhanced startup script which will automatically install missing dependencies.

### Server Not Responding
1. Check if Node.js is installed: `node --version`
2. Check if servers are running: `netstat -an | findstr :5001`
3. Restart with enhanced script for better error messages.

## Features
- **Login/Signup**: Fully functional
- **JWT Authentication**: Working
- **Google Gemini AI**: Integrated (requires valid API key)
- **MongoDB**: Connected and operational
- **CORS**: Configured for development

## Environment Variables
Make sure your `.env` file has:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```
