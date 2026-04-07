@echo off
cd /d "%~dp0..\shared\app"
..\windows\node\node.exe start-production.js
pause
