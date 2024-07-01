import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { defineConfig } from 'vite'
import vitePluginStylelint from 'vite-plugin-stylelint'
// import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    vitePluginStylelint(),
    // sitemap({
    //   changefreq: 'never',
    //   lastmod: new Date('2024-05-15'),
    //   priority: 1,
    // })
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({ preset: 'default' })
      ]
    }
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
