#!/bin/bash
set -e

echo "Building project..."
npm run build

echo "Preparing deploy directory..."
rm -rf deploy-temp
mkdir -p deploy-temp/aprendeplay

echo "Copying built files..."
cp -r dist/* deploy-temp/aprendeplay/

echo "Deploying to GitHub Pages..."
npx gh-pages -d deploy-temp --dotfiles

echo "Cleaning up..."
rm -rf deploy-temp

echo "Deploy complete!"
