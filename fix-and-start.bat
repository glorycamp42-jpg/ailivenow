@echo off
taskkill /F /IM node.exe /T 2>nul
timeout /t 3 /nobreak >nul
cd /d C:\Users\eugen\ailivenow
start "" "http://localhost:3000"
npm run dev
pause
