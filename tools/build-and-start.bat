@echo off
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul
cd /d C:\Users\eugen\ailivenow
echo Building...
npm run build
echo Starting production server...
npm start
pause
