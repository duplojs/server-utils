import { type DP, E, kindHeritage, unwrap } from "@duplojs/utils";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import type * as SF from "@scripts/file";
import { type EnvironmentVariableParams, environmentVariable } from "./environmentVariable";

export class EnvironmentVariableError extends kindHeritage(
	"environment-variable-error",
	createDuplojsServerUtilsKind("environment-variable-error"),
	Error,
) {
	public constructor(
		public error: SF.FileSystemLeft<"read-text-file"> | E.Error<DP.DataParserError>,
	) {
		super({}, ["Failed to load environment variables: one env file could not be read or parsed values do not match the provided schema."]);
	}
}

/**
 * {@include common/environmentVariableOrThrow/index.md}
 */
export async function environmentVariableOrThrow<
	GenericShape extends DP.DataParserObjectShape,
>(
	shape: GenericShape,
	params?: EnvironmentVariableParams,
): Promise<DP.DataParserObjectShapeOutput<GenericShape>> {
	const result = await environmentVariable(shape, params);

	if (E.isLeft(result)) {
		throw new EnvironmentVariableError(result);
	}

	return unwrap(result);
}
