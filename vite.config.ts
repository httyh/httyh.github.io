import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import {
//   createStyleImportPlugin,
//   AntdResolve,
// } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // createStyleImportPlugin({
    //   resolves: [
    //     AntdResolve(),
    //   ],
    //   libs: [
    //     // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
    //     {
    //       libraryName: 'ant-design',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `ant-design/es/${name}/style/index`
    //       },
    //     },
    //   ],
    // })
  ],
  build: {
    outDir: "docs"
  },
})
