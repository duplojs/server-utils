import { E, instanceOf, P, pipe, when } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		setCurrentWorkingDirectory<
			GenericPath extends string,
		>(path: GenericPath): E.Fail | E.Ok;
	}
}

/**
 * {@include common/setCurrentWorkingDirectory/index.md}
 */
export const setCurrentWorkingDirectory = implementFunction(
	"setCurrentWorkingDirectory",
	{
		NODE: (path: string) => pipe(
			path,
			when(
				instanceOf(URL),
				({ pathname }) => decodeURIComponent(pathname),
			),
			(path) => E.safeCallback(() => void process.chdir(path)),
			P.when(
				E.isLeft,
				E.fail,
			),
			P.otherwise(E.ok),
		),
		DENO: (path: string) => pipe(
			path,
			when(
				instanceOf(URL),
				({ pathname }) => decodeURIComponent(pathname),
			),
			(path) => E.safeCallback(() => void Deno.chdir(path)),
			P.when(
				E.isLeft,
				E.fail,
			),
			P.otherwise(E.ok),
		),
	},
);
