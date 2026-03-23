import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Figma asset aliases
      'figma:asset/f48ee0a1110bc62466a0f7fe521ac29a4170a918.png': path.resolve(__dirname, './src/assets/f48ee0a1110bc62466a0f7fe521ac29a4170a918.png'),
      'figma:asset/e594697f0a193d86366d6eddad81cf3e1bc91f3d.png': path.resolve(__dirname, './src/assets/e594697f0a193d86366d6eddad81cf3e1bc91f3d.png'),
      'figma:asset/d1f0deca8673def675075340fc21797fc65d573a.png': path.resolve(__dirname, './src/assets/d1f0deca8673def675075340fc21797fc65d573a.png'),
      'figma:asset/cb30198bda25705dfe0eebda1678b044f2e15012.png': path.resolve(__dirname, './src/assets/cb30198bda25705dfe0eebda1678b044f2e15012.png'),
      'figma:asset/cb012487c8e9251d2e8d275f7b2078135d0b6e71.png': path.resolve(__dirname, './src/assets/cb012487c8e9251d2e8d275f7b2078135d0b6e71.png'),
      'figma:asset/b73251087b4eede05583a68f2ba45f1911f0343b.png': path.resolve(__dirname, './src/assets/b73251087b4eede05583a68f2ba45f1911f0343b.png'),
      'figma:asset/ae387035b13c403bc67e44f640c3fa2e5cc3ed31.png': path.resolve(__dirname, './src/assets/ae387035b13c403bc67e44f640c3fa2e5cc3ed31.png'),
      'figma:asset/7723295fa5109e5c3b2fba0889f4a607c5ff4c10.png': path.resolve(__dirname, './src/assets/7723295fa5109e5c3b2fba0889f4a607c5ff4c10.png'),
      'figma:asset/69b2ac2ddbebb7df61da03657da18182f9468a9e.png': path.resolve(__dirname, './src/assets/69b2ac2ddbebb7df61da03657da18182f9468a9e.png'),
      'figma:asset/5454ff11ee6825dc019bd65b717efd2549be9282.png': path.resolve(__dirname, './src/assets/5454ff11ee6825dc019bd65b717efd2549be9282.png'),
      'figma:asset/3f01b53a06901483d974931b853c2c7fcd2cd90e.png': path.resolve(__dirname, './src/assets/3f01b53a06901483d974931b853c2c7fcd2cd90e.png'),
      'figma:asset/3b0291b7436075a29671cd3199ee81ebbb1c349d.png': path.resolve(__dirname, './src/assets/3b0291b7436075a29671cd3199ee81ebbb1c349d.png'),
      'figma:asset/34f15b516878f9444e820ffe79c92b6f460bbcff.png': path.resolve(__dirname, './src/assets/34f15b516878f9444e820ffe79c92b6f460bbcff.png'),
      'figma:asset/2269ffd704c3a702579045450db0c1da17df5597.png': path.resolve(__dirname, './src/assets/2269ffd704c3a702579045450db0c1da17df5597.png'),
      'figma:asset/1174ff5140dfe6ba9618eb25f3e0c8d4f9c0159a.png': path.resolve(__dirname, './src/assets/1174ff5140dfe6ba9618eb25f3e0c8d4f9c0159a.png'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
