@echo off
echo ========================================
echo        TruthStorm Application Starter
echo ========================================
echo.
echo Starting TruthStorm servers...
echo.

echo [1/3] Starting Backend Server...
cd backend
start "TruthStorm Backend" cmd /k "set PORT=5001 && node index.js"
echo Backend starting on http://localhost:5001
echo.

echo [2/3] Starting Frontend Server...
cd ..\frontend
timeout /t 3 /nobreak > nul
start "TruthStorm Frontend" cmd /k "npm run dev"
echo Frontend starting on http://localhost:5173 (or 5174)
echo.

echo [3/3] Waiting for servers to initialize...
timeout /t 5 /nobreak > nul

echo ========================================
echo           Servers Started!
echo ========================================
echo.
echo Frontend: http://localhost:5173 (or 5174)
echo Backend:  http://localhost:5001
echo.
echo Press any key to open TruthStorm in your browser...
pause > nul

echo Opening TruthStorm...
start http://localhost:5173

echo.
echo TruthStorm is now running!
echo - Backend: http://localhost:5001
echo - Frontend: http://localhost:5173
echo.
echo Close this window to stop all servers.
echo.
pause
