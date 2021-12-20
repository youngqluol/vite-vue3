import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

function resolvePath(p: string) {
  return path.resolve(process.cwd(), p);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolvePath('src')
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
});
