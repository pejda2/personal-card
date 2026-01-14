@echo off
echo Instaluji Zlata Lednice...
echo.

echo Instaluji backend...
cd backend
call npm install
cd ..

echo.
echo Instaluji frontend...
cd frontend
call npm install
cd ..

echo.
echo Hotovo! Vse zavislosti jsou nainstalovany.
echo.
echo Spusteni:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm run dev
