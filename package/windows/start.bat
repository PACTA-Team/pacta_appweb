@echo off
cd /d "%~dp0app"
set NODE_ENV=production
set PORT=3000
..\node\node.exe server.js
pause
