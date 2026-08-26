@echo off
setlocal EnableExtensions
title LLM Runner AIO - Commit + Push

REM === repo kok dizinine git (bu dosya tasks/ icinde) ===
cd /d "%~dp0.."

echo ============================================================
echo  LLM Runner AIO - Commit + Push
echo  Repo: %cd%
echo ============================================================
echo.
echo DEGISIKLIKLER:
git status --short
echo.

set "ONAY="
set /p "ONAY=Commit + push yapilsin mi? (devam icin E, iptal icin diger hersey): "
if /i "%ONAY%"=="E" goto :devam
echo Iptal edildi, hiçbir şey yapılmadı.
pause
exit /b 0

:devam
git add src/app/llm-runner-aio/page.tsx
if errorlevel 1 goto :err_add
git diff --cached --stat
git commit -m "chore: update LLM Runner AIO download links [%date%]"
if errorlevel 1 goto :err_commit
git pull --rebase origin main
if errorlevel 1 goto :err_rebase
git push origin main
if errorlevel 1 goto :err_push

echo.
echo ============================================================
echo  TAMAM! Push edildi. Vercel ~1 dk icinde deploy eder.
echo  Canli sayfa: https://aihublocal.com/llm-runner-aio
echo ============================================================
pause
exit /b 0

:err_add
echo HATA: git add basarisiz.
pause
exit /b 1

:err_commit
echo HATA: commit basarisiz (muhtemelen degisiklik yok).
pause
exit /b 1

:err_rebase
echo HATA: rebase basarisiz (git status ile kontrol et).
pause
exit /b 1

:err_push
echo HATA: push basarisiz.
pause
exit /b 1
