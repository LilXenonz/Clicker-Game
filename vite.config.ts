import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: [],
		external: ['@prisma/client', '@prisma/adapter-better-sqlite3', 'better-sqlite3']
	}
});