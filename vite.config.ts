import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import autoImportComponents from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), autoImportComponents(), createHtmlPlugin()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				chunkFileNames: '[name].js',
				entryFileNames: '[name].js',
				assetFileNames: 'assets/[name][extname]'
			}
		}
	}
});
