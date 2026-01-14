#!/bin/bash

echo "Instaluji Zlatá Lednice..."
echo ""

echo "Instaluji backend..."
cd backend
npm install
cd ..

echo ""
echo "Instaluji frontend..."
cd frontend
npm install
cd ..

echo ""
echo "Hotovo! Všechny závislosti jsou nainstalovány."
echo ""
echo "Spuštění:"
echo "1. Backend: cd backend && npm run dev"
echo "2. Frontend: cd frontend && npm run dev"
