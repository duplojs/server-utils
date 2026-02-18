import { kindHeritage } from "@duplojs/utils";
import { createDuplojsServerUtilsKind } from "@scripts/kind";

export class CommandManyArgumentsError extends kindHeritage(
	"command-many-arguments-error",
	createDuplojsServerUtilsKind("command-many-arguments-error"),
	Error,
) {
	public constructor(
		public restArgumentsLength: number,
	) {
		super({}, [`Expected exactly one subject argument, received ${restArgumentsLength}.`]);
	}
}

export class CommandOptionValueLooksLikeOptionError extends kindHeritage(
	"command-option-value-looks-like-option-error",
	createDuplojsServerUtilsKind("command-option-value-looks-like-option-error"),
	Error,
) {
	public constructor(
		public optionName: string,
		public value: string | undefined,
	) {
		super({}, [`Missing value for option "${optionName}": received another option token instead of a value.`]);
	}
}

export class CommandOptionValueNotRequiredError extends kindHeritage(
	"command-option-value-not-required-error",
	createDuplojsServerUtilsKind("command-option-value-not-required-error"),
	Error,
) {
	public constructor(
		public optionName: string,
	) {
		super({}, [`Option "${optionName}" does not accept a value.`]);
	}
}

export class CommandOptionRequiredError extends kindHeritage(
	"command-option-required-error",
	createDuplojsServerUtilsKind("command-option-required-error"),
	Error,
) {
	public constructor(
		public optionName: string,
	) {
		super({}, [`Option "${optionName}" is required.`]);
	}
}
