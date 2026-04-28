import type { AnyFunction, MaybePromise } from "@duplojs/utils";
import { type CreateCommandExecuteParams, type CreateCommandParams, type Subject, create } from "./create";
import type { Option } from "./options";
import { exitProcess, getProcessArguments } from "@scripts/common";
import { createError, interpretCommandError, SymbolCommandError } from "./error";

/**
 * {@include command/exec/index.md}
 */
export function exec(
	execute: () => void,
): Promise<void>;

export function exec<
	GenericOptions extends readonly Option[],
	GenericSubject extends Subject,
>(
	params: CreateCommandParams<
		GenericOptions,
		GenericSubject
	>,
	execute: (
		params: CreateCommandExecuteParams<GenericOptions, GenericSubject>,
	) => MaybePromise<void>,
): Promise<void>;

export async function exec(
	...args: [AnyFunction] | [CreateCommandParams, AnyFunction]
): Promise<void> {
	const [params, execute] = args.length === 1
		? [{}, args[0]]
		: args;

	const error = createError("root");

	const result = await create(
		"root",
		params,
		execute,
	).execute(
		getProcessArguments(),
		error,
	);

	if (result === SymbolCommandError) {
		// eslint-disable-next-line no-console
		console.error(interpretCommandError(error));
		return void exitProcess(1);
	}
}
