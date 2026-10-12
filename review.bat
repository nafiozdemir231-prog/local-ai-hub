@echo off
setlocal
title aihublocal - local review server
cd /d "%~dp0"
echo.
echo  ============================================
echo   aihublocal.com - LOCAL REVIEW (port 3100)
echo  ============================================
echo    [1] dev mode        : fast start, hot reload
echo    [2] production mode : full build + serve
echo.
set /p mode=Select 1 or 2: 
if "%mode%"=="2" goto :prod
goto :dev

:dev
echo  Starting dev server on http://localhost:3100 ...
echo  (browser opens in ~6s, Ctrl+C to stop)
start "" /min cmd /c "timeout /t 6 >nul & start http://localhost:3100"
call npx next dev -p 3100
goto :eof

:prod
echo  Building production bundle...
call npm run build
if errorlevel 1 goto :err
echo  Serving on http://localhost:3100 ...
echo  (Ctrl+C to stop)
start "" /min cmd /c "timeout /t 3 >nul & start http://localhost:3100"
call npx next start -p 3100
goto :eof

:err
echo  BUILD FAILED - fix errors and retry.
pause
