@echo off
cd /d "%~dp0"
echo Stopping Local AI Hub...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3005') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo Done
