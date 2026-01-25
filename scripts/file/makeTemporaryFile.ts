import { E, Path } from "@duplojs/utils";
import { implementFunction, nodeCrypto, nodeFileSystem, nodeOs } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		makeTemporaryFile(prefix: string, suffix?: string): Promise<E.EitherFail | E.EitherSuccess<string>>;
	}
}

/**
 * {@include file/makeTemporaryFile/index.md}
 */
export const makeTemporaryFile = implementFunction(
	"makeTemporaryFile",
	{
		NODE: async(prefix, suffix) => {
			const fs = await nodeFileSystem.value;
			const os = await nodeOs.value;
			const crypto = await nodeCrypto.value;

			const fileTemporaryPath = Path.resolveRelative([
				os.tmpdir(),
				`${prefix}${crypto.randomUUID()}${suffix ?? ""}`,
			]);
			return fs.open(fileTemporaryPath, "wx")
				.then((fh) => fh.close())
				.then(() => E.success(fileTemporaryPath))
				.catch(E.fail);
		},
		DENO: (prefix, suffix) => Deno.makeTempFile({
			prefix,
			suffix,
		})
			.then(E.success)
			.catch(E.fail),
	},
);
