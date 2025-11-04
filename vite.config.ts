import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/AprendePlay/' : '/',
  build: {
    // Otimizações de build para melhor SEO e performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs em produção
      },
    },
    // Code splitting para melhor cache
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar dependências em chunks
          'vendor-framer': ['framer-motion'],
          'vendor-i18n': ['i18next', 'react-i18next'],
          'vendor-router': ['react-router-dom'],
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
    // Melhorar performance do CSS
    cssMinify: true,
    // Reportar tamanho do bundle
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500, // 500KB de limite
  },
  // Melhorias de performance
  server: {
    preTransformRequests: true,
  },
  // Otimizar resolução de módulos
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
