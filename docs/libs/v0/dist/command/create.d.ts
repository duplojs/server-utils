import { type Kind, type MaybePromise, type AnyTuple, type ComputedTypeError, type IsEqual, type And, type Not, type UnionContain, type NeverCoalescing } from "@duplojs/utils";
import type { Option } from "./options";
import { SymbolCommandError, type CommandError } from "./error";
import { type Argument } from "./argument";
import { type ForbiddenDuplicateName } from "./types";
declare const commandKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command", unknown>>;
export declare function isCommands(input: unknown): input is AnyTuple<Command>;
type CommandSubject = {
    readonly type: "subCommand";
    readonly subCommands: readonly Command[];
} | {
    readonly type: "argument";
    readonly args: readonly Argument[];
};
export interface Command<GenericName extends string = string> extends Kind<typeof commandKind.definition> {
    readonly name: GenericName;
    readonly description: string | null;
    readonly subject: CommandSubject | null;
    readonly options: readonly Option[];
    execute(args: readonly string[], error: CommandError): Promise<undefined | SymbolCommandError>;
}
export type Subjects = AnyTuple<Argument> | AnyTuple<Command>;
export type ForbiddenBadOrderArguments<GenericSubject extends readonly Subjects[number][], GenericContainOptional extends boolean = false> = GenericSubject extends readonly [
    Argument<string, infer InferredValue>,
    ...infer InferredRest extends Argument[]
] ? And<[
    IsEqual<GenericContainOptional, true>,
    Not<UnionContain<InferredValue, undefined>>
]> extends true ? ComputedTypeError<"Optional argument can't be define before required argument"> : ForbiddenBadOrderArguments<InferredRest, UnionContain<InferredValue, undefined>> : unknown;
export interface CreateCommandParams<GenericOptions extends AnyTuple<Option> = AnyTuple<Option>, GenericSubject extends Subjects = Subjects> {
    description?: string;
    options?: (GenericOptions & ForbiddenDuplicateName<GenericOptions, "option">);
    subjects?: (GenericSubject & (Extract<([ForbiddenDuplicateName<GenericSubject, "subject">] | [ForbiddenBadOrderArguments<GenericSubject>]), [
        ComputedTypeError<string>
    ]> extends [infer InferredResult] ? NeverCoalescing<InferredResult, unknown> : unknown));
}
export type CreateCommandExecuteParams<GenericOptions extends AnyTuple<Option>, GenericArguments extends AnyTuple<Argument>> = ((IsEqual<GenericOptions, never> extends true ? {} : {
    options: {
        [GenericOption in GenericOptions[number] as GenericOption["name"]]: Exclude<Awaited<ReturnType<GenericOption["execute"]>>, SymbolCommandError>["result"];
    };
}) & (IsEqual<GenericArguments, never> extends true ? {} : {
    args: {
        [GenericArgument in GenericArguments[number] as GenericArgument["name"]]: Exclude<Awaited<ReturnType<GenericArgument["execute"]>>, SymbolCommandError>;
    };
}));
/**
 * Create a command node.
 * 
 * Use this builder to define a command name, optional options, optional command subjects, and the execute handler called after parsing.
 * 
 * ```ts
 * const ping = SC.create(
 * 	"ping",
 * 	() => {
 * 		// run ping action
 * 	},
 * );
 * 
 * const UserId = C.createNewType("user-id", DP.number(), C.Positive);
 * 
 * const greet = SC.create(
 * 	"greet",
 * 	{
 * 		options: [SC.createOption("email", C.Email)],
 * 		subjects: [SC.createArgument("userId", UserId)],
 * 	},
 * 	({ options: { email }, args: { userId } }) => {
 * 		// email: C.Email | undefined
 * 		// userId: C.GetNewType<typeof UserId>
 * 	},
 * );
 * 
 * const projectCreate = SC.create(
 * 	"create",
 * 	() => {
 * 		// create project
 * 	},
 * );
 * 
 * const project = SC.create(
 * 	"project",
 * 	{
 * 		subjects: [projectCreate],
 * 	},
 * 	() => {
 * 		// parent command fallback
 * 	},
 * );
 * ```
 * 
 * @remarks
 * `subjects` accepts either:
 * - an array of `createArgument(...)` for positional arguments
 * - an array of child commands for nested command trees
 * 
 * When positional arguments are used, parsed values are exposed as `args` in the execute callback.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/create
 * @namespace SC
 * 
 */
export declare function create<GenericName extends string>(name: GenericName, execute: () => void): Command<GenericName>;
export declare function create<GenericName extends string, const GenericOptions extends AnyTuple<Option> = never, GenericSubjects extends Subjects = never>(name: GenericName, params: CreateCommandParams<GenericOptions, GenericSubjects>, execute: (params: CreateCommandExecuteParams<GenericOptions, Extract<GenericSubjects, AnyTuple<Argument>>>) => MaybePromise<void>): Command<GenericName>;
export {};
