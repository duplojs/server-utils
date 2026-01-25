import { E, instanceOf, P, pipe, when } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		setCurrentWorkingDirectory<
			GenericPath extends string | URL,
		>(path: GenericPath): E.EitherFail | E.EitherOk;
	}
}

/**
 * {@include common/setCurrentWorkingDirectory/index.md}
 */
export const setCurrentWorkingDirectory = implementFunction(
	"setCurrentWorkingDirectory",
	{
		NODE: (path: string | URL) => pipe(
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
		DENO: (path: string | URL) => pipe(
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
