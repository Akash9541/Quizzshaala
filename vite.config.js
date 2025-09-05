import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-stats.html',
      template: 'treemap', // sunburst | treemap | network
      gzipSize: true,
      brotliSize: true
    })
  ],
  optimizeDeps: {
    include: ['framer-motion'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          state: ['zustand'],
        },
      },
    },
  },
});
