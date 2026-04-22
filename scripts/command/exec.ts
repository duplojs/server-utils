import type { AnyFunction, MaybePromise } from "@duplojs/utils";
import { type CreateCommandExecuteParams, type CreateCommandParams, type Subject, create } from "./create";
import type { Option } from "./options";
import { getProcessArguments } from "@scripts/common";

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

	await create(
		"root",
		params,
		execute,
	).execute(
		getProcessArguments(),
	);
}
