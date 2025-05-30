import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	clean: true,
	bundle: true,
	skipNodeModulesBundle: true,
	sourcemap: true,
});
