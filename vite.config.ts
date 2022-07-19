import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  createStyleImportPlugin,
  AntdResolve,
} from 'vite-plugin-style-import'

const resolve = (uri: string): string => path.resolve(__dirname, uri);

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '~/src/styles/var.scss';@import '~/styles/mixins.scss';`,
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [{ find: '~', replacement: resolve('./src') }],
  },
  plugins: [
    react(),
    createStyleImportPlugin({
      resolves: [
        AntdResolve(),
      ],
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name): string => {
            return `antd/es/${name}/style/index`
          },
        },
      ],
    })
  ],
  build: {
    outDir: 'docs'
  },
})
