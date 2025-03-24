import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'src/scripts/background.ts',
        content: 'src/scripts/content.ts',
      },
      output: {
        entryFileNames: 'scripts/[name].js',
      },
    },
    emptyOutDir: true,
  },
  test: {
    include: ['./src/**/*.test.ts'],
  },
});
