import type { Theme } from "vitepress";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import DefaultTheme from "vitepress/theme";
import "@shikijs/vitepress-twoslash/style.css";
import "virtual:group-icons.css";
import "./style.css";
import TerminalBlock from "./components/TerminalBlock.vue";

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.use(TwoslashFloatingVue);
		app.component("TerminalBlock", TerminalBlock);
	},
} satisfies Theme;
