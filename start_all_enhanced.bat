@echo off
setlocal enabledelayedexpansion

echo ========================================
echo        TruthStorm Application Starter
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if we're in the right directory
if not exist "backend\index.js" (
    echo ERROR: backend\index.js not found
    echo Please run this script from the TruthStorm root directory
    pause
    exit /b 1
)

if not exist "frontend\package.json" (
    echo ERROR: frontend\package.json not found
    echo Please run this script from the TruthStorm root directory
    pause
    exit /b 1
)

echo [1/3] Installing dependencies (if needed)...
echo.

:: Install backend dependencies
echo Installing backend dependencies...
cd backend
if not exist "node_modules" (
    echo Backend dependencies missing, installing...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
)

:: Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend
if not exist "node_modules" (
    echo Frontend dependencies missing, installing...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

cd ..

echo [2/3] Starting Backend Server...
cd backend
start "TruthStorm Backend" cmd /k "echo Starting backend on port 5001... && set PORT=5001 && node index.js"
echo Backend starting on http://localhost:5001
echo.

echo [3/3] Starting Frontend Server...
cd ..\frontend
timeout /t 3 /nobreak > nul
start "TruthStorm Frontend" cmd /k "echo Starting frontend... && npm run dev"
echo Frontend starting...
echo.

echo [4/4] Waiting for servers to initialize...
timeout /t 8 /nobreak > nul

echo ========================================
echo           Servers Started!
echo ========================================
echo.
echo Checking server status...
echo.

:: Check if backend is running
echo Checking backend...
curl -s http://localhost:5001 >nul 2>&1
if errorlevel 1 (
    echo WARNING: Backend may not be responding yet
) else (
    echo [OK] Backend is running on http://localhost:5001
)

:: Check if frontend is running
echo Checking frontend...
netstat -an | findstr :5173 >nul 2>&1
if errorlevel 1 (
    netstat -an | findstr :5174 >nul 2>&1
    if errorlevel 1 (
        echo WARNING: Frontend may not be responding yet
    ) else (
        echo [OK] Frontend is running on http://localhost:5174
    )
) else (
    echo [OK] Frontend is running on http://localhost:5173
)

echo.
echo ========================================
echo           Application Ready!
echo ========================================
echo.
echo Frontend: http://localhost:5173 (or 5174)
echo Backend:  http://localhost:5001
echo.
echo Press 1 to open TruthStorm in browser
echo Press 2 to stop all servers
echo Press any other key to continue
echo.

choice /c 12 /n /m "Select an option: "
if errorlevel 2 (
    echo.
    echo Stopping all servers...
    taskkill /f /im node.exe >nul 2>&1
    echo Servers stopped.
    pause
    exit /b 0
)

if errorlevel 1 (
    echo.
    echo Opening TruthStorm...
    start http://localhost:5173
    timeout /t 2 /nobreak > nul
    start http://localhost:5001
)

echo.
echo ========================================
echo        TruthStorm is Running!
echo ========================================
echo.
echo Frontend: http://localhost:5173 (or 5174)
echo Backend:  http://localhost:5001
echo.
echo To stop all servers, close the terminal windows
echo or run: taskkill /f /im node.exe
echo.
echo Press any key to exit this setup...
pause > nul
