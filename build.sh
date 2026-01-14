#!/bin/bash
# Railway build script

echo "=== Building Zlata Lednice ==="

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
npm run build
cd ..

echo "=== Build Complete ==="
