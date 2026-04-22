import * as AA from "@duplojs/utils/array";
import * as OO from "@duplojs/utils/object";
import { createError, interpretExecOptionError, SymbolCommandError } from "./error";
import { logExecOptionHelp } from "./help";
import { createBooleanOption, type Option } from "./options";
import { exitProcess, getProcessArguments } from "@scripts/common";

type ComputeResult<
	GenericOptions extends [Option, ...Option[]],
> = {
	[GenericOptionName in GenericOptions[number]["name"]]: Exclude<
		ReturnType<
			Extract<
				GenericOptions[number],
				{ name: GenericOptionName }
			>["execute"]
		>,
		SymbolCommandError
	>["result"]
};

const helpOption = createBooleanOption("help", { aliases: ["h"] });

export function execOptions<
	GenericOptions extends [Option, ...Option[]],
>(
	...options: GenericOptions
): ComputeResult<GenericOptions>;

export function execOptions(
	...options: [Option, ...Option[]]
) {
	const processArguments = getProcessArguments();
	const error = createError("root");
	const help = helpOption.execute(processArguments, error);

	if (help === SymbolCommandError) {
		// eslint-disable-next-line no-console
		console.error(interpretExecOptionError(error));
		return void exitProcess(1);
	} else if (help.result) {
		logExecOptionHelp(options);
		return void exitProcess(0);
	}

	const result = AA.reduce(
		options,
		AA.reduceFrom<{
			options: Record<string, unknown>;
			restArgs: readonly string[];
		}>({
			options: {},
			restArgs: processArguments,
		}),
		({ element: option, lastValue, next, exit }) => {
			const optionResult = option.execute(lastValue.restArgs, error);

			if (optionResult === SymbolCommandError) {
				return exit(SymbolCommandError);
			}

			return next({
				options: OO.override(
					lastValue.options,
					{
						[option.name]: optionResult.result,
					},
				),
				restArgs: optionResult.argumentRest,
			});
		},
	);

	if (result === SymbolCommandError) {
		// eslint-disable-next-line no-console
		console.error(interpretExecOptionError(error));
		return void exitProcess(1);
	}

	return result.options;
}
