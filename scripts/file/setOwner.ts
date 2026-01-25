import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

interface SetOwnerParams {
	userId: number;
	groupId: number;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		setOwner(
			path: string | URL,
			params: SetOwnerParams,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/setOwner/index.md}
 */
export const setOwner = implementFunction(
	"setOwner",
	{
		NODE: async(path, { userId, groupId }) => {
			const fs = await nodeFileSystem.value;
			return fs.chown(path, userId, groupId)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (path, { userId, groupId }) => Deno
			.chown(path, userId, groupId)
			.then(E.ok)
			.catch(E.fail),
	},
);
