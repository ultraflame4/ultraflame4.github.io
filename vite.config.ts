import { fileURLToPath, URL } from 'node:url'
import type {ViteSSGOptions} from "vite-ssg";
import type {UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


const config: UserConfig = {
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // "vyue42": fileURLToPath(new URL('../vyue42', import.meta.url))
    }
  },
  assetsInclude: [
      "data/*"
  ],
  ssr:{
    noExternal: "vyue42",
  },
  ssgOptions:{
    mock: true,
    dirStyle: "flat",
    script: "async defer",
  },
  base:"/v6"
}
export default config
