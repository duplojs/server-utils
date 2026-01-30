import { E, pipe } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		getCurrentWorkDirectory(): E.Error<unknown> | E.Success<string>;
		getCurrentWorkDirectoryOrThrow(): string;
	}
}

/**
 * {@include common/getCurrentWorkDirectory/index.md}
 */
export const getCurrentWorkDirectory = implementFunction(
	"getCurrentWorkDirectory",
	{
		NODE: () => pipe(
			E.safeCallback(() => E.success(process.cwd())),
			E.whenIsLeft(E.error),
		),
		DENO: () => pipe(
			E.safeCallback(() => E.success(Deno.cwd())),
			E.whenIsLeft(E.error),
		),
	},
);

/**
 * {@include common/getCurrentWorkDirectoryOrThrow/index.md}
 */
export const getCurrentWorkDirectoryOrThrow = implementFunction(
	"getCurrentWorkDirectoryOrThrow",
	{
		NODE: () => process.cwd(),
		DENO: () => Deno.cwd(),
	},
);
