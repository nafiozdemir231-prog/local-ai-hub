@echo off
cd /d "%~dp0"
echo Starting Local AI Hub...
echo Port: 3005
start http://localhost:3005
start npm run dev
