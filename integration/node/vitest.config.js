import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		include: [
			"integration/node/**/*.test.ts",
		],
		benchmark: {
			include: [
				"integration/node/**/*.bench.ts",
			]
		}
	},
	plugins: [
		tsconfigPaths({ projects: ["integration/node/tsconfig.json"] }),
	],
});
