import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),Components({
        resolvers: [VantResolver()],
    })],
    define: {
        global: 'window',
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        // 是否开启 https
        https: false,
    }
})
