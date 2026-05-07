import { type AnyFunction, type AnyTuple, type MaybePromise } from "@duplojs/utils";
import { exitProcess, getProcessArguments } from "@scripts/common";
import { type CreateCommandExecuteParams, type CreateCommandParams, type Subjects, create } from "./create";
import type { Option } from "./options";
import { createError, interpretCommandError, SymbolCommandError } from "./error";

export type ExecCommandParams<
	GenericOptions extends AnyTuple<Option> = AnyTuple<Option>,
	GenericSubjects extends Subjects = Subjects,
> = (
	& CreateCommandParams<
		GenericOptions,
		GenericSubjects
	> & {

		/**
		 * @default "root"
		 */
		displayName?: string;
	}
);

/**
 * {@include command/exec/index.md}
 */
export function exec(
	execute: () => void,
): Promise<never>;

export function exec<
	const GenericOptions extends AnyTuple<Option> = never,
	GenericSubjects extends Subjects = never,
>(
	params: ExecCommandParams<
		GenericOptions,
		GenericSubjects
	>,
	execute: (
		params: CreateCommandExecuteParams<GenericOptions, GenericSubjects>,
	) => MaybePromise<void>,
): Promise<never>;

export async function exec(
	...args: [AnyFunction] | [ExecCommandParams, AnyFunction]
) {
	const [params, execute] = args.length === 1
		? [{}, args[0]]
		: args;

	const displayName = params.displayName ?? "root";

	const error = createError(displayName);

	const result = await create(
		displayName,
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
