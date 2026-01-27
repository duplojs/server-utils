import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		include: [
			"tests/**/*.test.ts",
			"integration/node/**/*.test.ts"
		],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json", "html", "json-summary"],
			reportsDirectory: "coverage",
			include: ["scripts"],
			exclude: [
				"**/*.test.ts", 
				"bin", 
				"dist",
				"docs",
				"scripts/implementor.ts"
			],
			thresholds: {
				lines: 100,
				branches: 100,
				functions: 100,
				statements: 100
			}
		},
		benchmark: {
			include: [
				"tests/**/*.bench.ts",
				"integration/node/**/*.bench.ts",
			]
		}
	},
	plugins: [tsconfigPaths()],
});
