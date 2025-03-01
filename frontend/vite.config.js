import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5000,
    host: true,
    allowedHosts: [
      'healthcareapp.eastus.cloudapp.azure.com',
    ],
  },
});
