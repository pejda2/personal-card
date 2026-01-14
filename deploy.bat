@echo off
echo ========================================
echo   ZLATA LEDNICE - Automaticky Deployment
echo ========================================
echo.

REM Kontrola Git repozitare
if not exist .git (
    echo Inicializuji Git repozitar...
    git init
    git add .
    git commit -m "Initial commit: Zlata Lednice app"
    echo.
    echo DALSÍ KROK:
    echo 1. Vytvor novy repozitar na GitHub.com
    echo 2. Spust: git remote add origin https://github.com/TVOJE_JMENO/zlata-lednice.git
    echo 3. Spust: git push -u origin main
    echo.
    pause
    exit /b
)

REM Git push
echo Nahravam na GitHub...
git add .
git commit -m "Update: %date% %time%"
git push

echo.
echo ========================================
echo   NASAZENI NA WEB
echo ========================================
echo.
echo Vyber hosting:
echo 1. Vercel (doporucuji - nejjednodussi)
echo 2. Netlify
echo 3. Railway (vcetne databaze)
echo.
set /p choice="Tvuj vyber (1-3): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto railway

:vercel
echo.
echo NASAZENI NA VERCEL:
echo 1. Jdi na https://vercel.com
echo 2. Prihlaste se pres GitHub
echo 3. Klikni "Add New" -^> "Project"
echo 4. Import tvuj GitHub repozitar
echo 5. Vercel to automaticky nasadi
echo.
echo Tvuj web bude na: https://zlata-lednice.vercel.app
pause
exit /b

:netlify
echo.
echo NASAZENI NA NETLIFY:
echo 1. Jdi na https://netlify.com
echo 2. Drag & drop slozku 'frontend/dist' po 'npm run build'
echo 3. Web bude online za 30 sekund
pause
exit /b

:railway
echo.
echo NASAZENI NA RAILWAY:
echo 1. Jdi na https://railway.app
echo 2. Prihlaste se pres GitHub
echo 3. New Project -^> Deploy from GitHub repo
echo 4. Railway automaticky detekuje PostgreSQL
echo 5. Backend + frontend + databaze vse na jednom miste
pause
exit /b
