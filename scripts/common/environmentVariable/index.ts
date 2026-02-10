import { A, DP, E, O, pipe, unwrap } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";
import type * as SF from "@scripts/file";
import { parseEnvironmentFiles } from "./parseEnvironmentFiles";
import { expandEnvironmentVariables } from "./expandEnvironmentVariables";
import { overrideEnvironmentVariables } from "./overrideEnvironmentVariables";

export interface EnvironmentVariableParams {

	paths?: string[];

	/**
	 * @default false
	 */
	override: boolean;

	/**
	 * @default false
	 */
	justRead: boolean;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		environmentVariable<
			GenericShape extends DP.DataParserObjectShape,
		>(
			shape: GenericShape,
			params?: EnvironmentVariableParams,
		): Promise<
			| E.Success<DP.DataParserObjectShapeOutput<GenericShape>>
			| SF.FileSystemLeft<"read-text-file">
			| E.Error<DP.DataParserError>
		>;
	}
}

export const environmentVariable = implementFunction(
	"environmentVariable",
	{
		NODE: async(shape, params) => {
			const baseEnv = pipe(
				process.env,
				O.entries,
				A.filter((entry) => entry[1] !== undefined),
				O.fromEntries,
			);

			const parseEnvFileResult = await parseEnvironmentFiles(
				baseEnv,
				params?.paths ?? [],
			);

			if (E.isLeft(parseEnvFileResult)) {
				return parseEnvFileResult;
			}

			const overrideEnvResult = overrideEnvironmentVariables(
				parseEnvFileResult,
				params?.override ?? false,
			);

			const expandEnvResult = expandEnvironmentVariables(overrideEnvResult);

			const schema = DP.object(shape);
			const parsedEnvResult = schema.parse(expandEnvResult);

			if (E.isLeft(parsedEnvResult)) {
				return parsedEnvResult;
			}

			if (params?.justRead !== true) {
				process.env = unwrap(expandEnvResult);
			}

			return parsedEnvResult;
		},
		DENO: async(shape, params) => {
			const parseEnvFileResult = await parseEnvironmentFiles(
				Deno.env.toObject(),
				params?.paths ?? [],
			);

			if (E.isLeft(parseEnvFileResult)) {
				return parseEnvFileResult;
			}

			const overrideEnvResult = overrideEnvironmentVariables(
				parseEnvFileResult,
				params?.override ?? false,
			);

			const expandEnvResult = expandEnvironmentVariables(overrideEnvResult);

			const schema = DP.object(shape);
			const parsedEnvResult = schema.parse(expandEnvResult);

			if (E.isLeft(parsedEnvResult)) {
				return parsedEnvResult;
			}

			if (params?.justRead !== true) {
				for (const [key, value] of O.entries(expandEnvResult)) {
					if (value) {
						Deno.env.set(key, value);
					}
				}
			}

			return parsedEnvResult;
		},
	},
);
