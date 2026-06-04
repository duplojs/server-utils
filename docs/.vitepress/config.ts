import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { ModuleDetectionKind, ModuleKind, ModuleResolutionKind } from "typescript";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { Path, S } from "@duplojs/utils";

const hostname = "https://server-utils.duplojs.dev";
const ogImage = new URL("/images/ogImage.png", hostname).toString();

export default defineConfig({
	title: "@duplojs/server-utils",
	base: "/",
	cleanUrls: true,
	sitemap: {
		hostname,
	},
	themeConfig: {
		logo: "/images/logo.png",

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/duplojs/server-utils",
			},
			{
				icon: "npm",
				link: "https://www.npmjs.com/package/@duplojs/server-utils",
			},
			{
				icon: "linkedin",
				link: "https://linkedin.com/company/duplojs",
			},
			{
				icon: "discord",
				link: "https://discord.gg/5d6Ze5Wuqm",
			},
		],

		search: {
			provider: "local",
		},
	},
	head: [
		[
			"link",
			{
				rel: "icon",
				href: "/images/logo.ico",
			},
		],
		[
			"meta",
			{
				property: "og:type",
				content: "website",
			},
		],
		[
			"meta",
			{
				property: "og:image",
				content: ogImage,
			},
		],
		[
			"meta",
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
		],
		[
			"meta",
			{
				name: "twitter:image",
				content: ogImage,
			},
		],
	],
	markdown: {
		lineNumbers: false,
		theme: {
			light: "light-plus",
			dark: "dark-plus",
		},
		config: (md) => {
			md.use(groupIconMdPlugin);
		},
		codeTransformers: [
			{
				name: "duplo-version-transformer",
				preprocess: S.replace(
					/ ?@ts-expect-error/g,
					"",
				),
				postprocess: S.replace(
					/"@server-utils\/v([0-9]+)/g,
					"\"@duplojs/server-utils",
				),
			},
			transformerTwoslash({
				twoslashOptions: {
					customTags: ["annotate", "log", "warn", "error"],
					compilerOptions: {
						module: ModuleKind.ESNext,
						moduleResolution: ModuleResolutionKind.Bundler,
						moduleDetection: ModuleDetectionKind.Force,
						allowArbitraryExtensions: true,
						strict: true,
						noImplicitAny: true,
						strictNullChecks: true,
						strictFunctionTypes: true,
						strictBindCallApply: true,
						strictPropertyInitialization: true,
						noImplicitThis: true,
						useUnknownInCatchVariables: true,
						alwaysStrict: true,
						noImplicitReturns: true,
						noUncheckedIndexedAccess: true,
						noImplicitOverride: true,
					},
				},
			}),
		],
		languages: ["js", "jsx", "ts", "tsx"],
	},
	vite: {
		plugins: [groupIconVitePlugin()],
		resolve: {
			alias: {
				"@": Path.resolveRelative([import.meta.dirname, ".."]),
			},
		},
	},
	transformPageData(pageData) {
		const frontmatter = pageData.frontmatter ?? {};

		if (frontmatter.layout === "home") {
			return pageData;
		}

		if (typeof frontmatter.pageClass === "string" && frontmatter.pageClass.length > 0) {
			return pageData;
		}

		frontmatter.pageClass = "layout-wide";
		pageData.frontmatter = frontmatter;

		return pageData;
	},
	locales: {
		fr: {
			description: "Utilitaires serveur légers et efficaces",
			label: "Français",
			lang: "fr",
			link: "/fr/",
			themeConfig: {
				nav: [
					{
						text: "Guide",
						link: "/fr/v0/guide/",
					},
					{
						text: "API",
						items: [
							{
								text: "Overview",
								link: "/fr/v0/api/",
							},
							{
								text: "Common",
								link: "/fr/v0/api/common/",
							},
							{
								text: "File",
								link: "/fr/v0/api/file/",
							},
							{
								text: "DataParser",
								link: "/fr/v0/api/dataParser/",
							},
							{
								text: "Command",
								link: "/fr/v0/api/command/",
							},
						],
					},
					{
						text: "v0.x (LTS)",
						items: [
							{
								text: "v0.x (LTS)",
								link: "/fr/v0/guide/",
							},
						],
					},
				],
				sidebar: {
					"/fr/v0/guide/": [
						{
							text: "Commencer",
							items: [
								{
									text: "Introduction",
									link: "/fr/v0/guide/",
								},
								{
									text: "Démarrer rapide",
									link: "/fr/v0/guide/quickStart",
								},
							],
						},
						{
							text: "Commandes",
							items: [
								{
									text: "Créer une commande",
									link: "/fr/v0/guide/command",
								},
								{
									text: "Options",
									link: "/fr/v0/guide/command#ajouter-des-options",
								},
								{
									text: "Erreurs",
									link: "/fr/v0/guide/command#comprendre-les-erreurs",
								},
								{
									text: "Sous-commandes",
									link: "/fr/v0/guide/command#sous-commandes",
								},
								{
									text: "Help généré",
									link: "/fr/v0/guide/command#help-genere",
								},
							],
						},
					],
				},
				docFooter: {
					prev: "Page précédente",
					next: "Page suivante",
				},
				outline: {
					label: "Sur cette page",
				},
				returnToTopLabel: "Retour en haut",
				darkModeSwitchLabel: "Mode sombre",
				footer: {
					copyright: "Copyright © 2025-présent Contributeurs de DuploJS",
					message: "Diffusé sous licence MIT.",
				},
			},
		},
		root: {
			description: "Lightweight and efficient server utilities",
			label: "English",
			lang: "en",
			link: "/en/",
			themeConfig: {
				nav: [
					{
						text: "Guide",
						link: "/en/v0/guide/",
					},
					{
						text: "API",
						items: [
							{
								text: "Overview",
								link: "/en/v0/api/",
							},
							{
								text: "Common",
								link: "/en/v0/api/common/",
							},
							{
								text: "File",
								link: "/en/v0/api/file/",
							},
							{
								text: "DataParser",
								link: "/en/v0/api/dataParser/",
							},
							{
								text: "Command",
								link: "/en/v0/api/command/",
							},
						],
					},
					{
						text: "v0.x (LTS)",
						items: [
							{
								text: "v0.x (LTS)",
								link: "/en/v0/guide/",
							},
						],
					},
				],
				sidebar: {
					"/en/v0/guide/": [
						{
							text: "Getting Started",
							items: [
								{
									text: "Introduction",
									link: "/en/v0/guide/",
								},
								{
									text: "Quick start",
									link: "/en/v0/guide/quickStart",
								},
							],
						},
						{
							text: "Commands",
							items: [
								{
									text: "Create a command",
									link: "/en/v0/guide/command",
								},
								{
									text: "Options",
									link: "/en/v0/guide/command#add-options",
								},
								{
									text: "Errors",
									link: "/en/v0/guide/command#understand-errors",
								},
								{
									text: "Subcommands",
									link: "/en/v0/guide/command#subcommands",
								},
								{
									text: "Generated Help",
									link: "/en/v0/guide/command#generated-help",
								},
							],
						},
					],
				},
				docFooter: {
					prev: "Previous page",
					next: "Next page",
				},
				outline: { label: "On this page" },
				returnToTopLabel: "Return to top",
				darkModeSwitchLabel: "Dark mode",
				footer: {
					copyright: "Copyright © 2025-present DuploJS Contributors",
					message: "Released under the MIT license.",
				},
			},
		},
	},
});
