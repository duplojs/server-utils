import { E, P, pipe, unwrap } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		getCurrentWorkDirectory(): E.Fail | E.Success<string>;
	}
}

/**
 * {@include common/getCurrentWorkDirectory/index.md}
 */
export const getCurrentWorkDirectory = implementFunction(
	"getCurrentWorkDirectory",
	{
		NODE: () => pipe(
			E.safeCallback(() => process.cwd()),
			P.when(
				E.isLeft,
				E.fail,
			),
			P.otherwise((result) => E.success(unwrap(result))),
		),
		DENO: () => pipe(
			E.safeCallback(() => Deno.cwd()),
			P.when(
				E.isLeft,
				E.fail,
			),
			P.otherwise((result) => E.success(unwrap(result))),
		),
	},
);
