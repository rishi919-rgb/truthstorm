@echo off
echo ========================================
echo        TruthStorm Server Stopper
echo ========================================
echo.
echo Stopping all TruthStorm servers...
echo.

taskkill /f /im node.exe >nul 2>&1

if errorlevel 1 (
    echo No Node.js processes were running.
) else (
    echo All Node.js processes stopped successfully.
)

echo.
echo ========================================
echo        Servers Stopped!
echo ========================================
echo.
echo Press any key to exit...
pause > nul
