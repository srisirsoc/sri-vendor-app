import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'next/link': path.resolve(__dirname, 'src/shims/next/link.jsx'),
      'next/navigation': path.resolve(__dirname, 'src/shims/next/navigation.js'),
      'next/script': path.resolve(__dirname, 'src/shims/next/script.jsx'),
      'next/image': path.resolve(__dirname, 'src/shims/next/image.jsx'),
      'next/font/google': path.resolve(__dirname, 'src/shims/next/font/google.js'),
      'next/dynamic': path.resolve(__dirname, 'src/shims/next/dynamic.jsx'),
    },
  },
});
