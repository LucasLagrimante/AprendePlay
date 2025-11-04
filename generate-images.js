import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

// Criar cores para as imagens
const colors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  text: '#FFFFFF'
};

// Função para gerar OG Image
async function generateOGImage() {
  console.log('Gerando OG Image (1200x630)...');

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bgGradient)"/>

      <!-- Main Title -->
      <text x="600" y="180" font-size="80" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">
        AprendePlay
      </text>

      <!-- Subtitle -->
      <text x="600" y="280" font-size="48" text-anchor="middle" fill="white" font-family="Arial, sans-serif" opacity="0.95">
        Aprenda Brincando em 8 Idiomas
      </text>

      <!-- Emojis -->
      <text x="300" y="400" font-size="120" text-anchor="middle">🎨</text>
      <text x="600" y="400" font-size="120" text-anchor="middle">🔤</text>
      <text x="900" y="400" font-size="120" text-anchor="middle">🎯</text>

      <!-- Footer -->
      <text x="600" y="580" font-size="32" text-anchor="middle" fill="white" font-family="Arial, sans-serif" opacity="0.9">
        Educação Interativa para Crianças
      </text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log('✅ OG Image gerada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao gerar OG Image:', error.message);
  }
}

// Função para gerar Favicons
async function generateFavicons() {
  console.log('Gerando Favicons em múltiplos tamanhos...');

  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#grad)" rx="100"/>
      <text x="256" y="350" font-size="280" text-anchor="middle" dominant-baseline="middle">🎨</text>
    </svg>
  `;

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];

  for (const favicon of sizes) {
    try {
      await sharp(Buffer.from(svg))
        .resize(favicon.size, favicon.size)
        .png()
        .toFile(path.join(publicDir, favicon.name));
      console.log(`✅ ${favicon.name} (${favicon.size}x${favicon.size}) gerado!`);
    } catch (error) {
      console.error(`❌ Erro ao gerar ${favicon.name}:`, error.message);
    }
  }
}

// Executar ambas as funções
async function main() {
  console.log('🖼️  Iniciando geração de imagens...\n');
  await generateOGImage();
  console.log('');
  await generateFavicons();
  console.log('\n✅ Todas as imagens foram geradas com sucesso!');
}

main().catch(error => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
