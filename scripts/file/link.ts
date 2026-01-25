import { E, instanceOf, O, pipe, when } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		link(
			existingPath: string | URL,
			newPath: string | URL,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/link/index.md}
 */
export const link = implementFunction(
	"link",
	{
		NODE: async(existingPath, newPath) => {
			const fs = await nodeFileSystem.value;
			return fs.link(
				existingPath,
				newPath,
			)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (existingPath, newPath) => Deno
			.link(
				instanceOf(existingPath, URL)
					? decodeURIComponent(existingPath.pathname)
					: existingPath,
				instanceOf(newPath, URL)
					? decodeURIComponent(newPath.pathname)
					: newPath,
			)
			.then(E.ok)
			.catch(E.fail),
	},
);
