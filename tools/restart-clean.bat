@echo off
echo Node 프로세스 정리 중...
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo 충돌 파일 제거 중...
if exist "C:\Users\eugen\package-lock.json" (
  del /F "C:\Users\eugen\package-lock.json"
  echo package-lock.json 제거 완료
)

echo 서버 시작 중...
cd /d C:\Users\eugen\ailivenow
npm run dev
pause
