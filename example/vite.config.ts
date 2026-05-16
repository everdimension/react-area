import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // The example imports the library straight from ../src
    fs: { allow: ['..'] },
  },
});
