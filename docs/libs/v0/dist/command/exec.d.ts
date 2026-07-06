import type { AnyTuple, MaybePromise } from "@duplojs/utils";
import { type CreateCommandExecuteParams, type CreateCommandParams, type Subjects } from "./create";
import type { Option } from "./options";
import type { Argument } from "./argument";
export type ExecCommandParams<GenericOptions extends AnyTuple<Option> = AnyTuple<Option>, GenericSubjects extends Subjects = Subjects> = (CreateCommandParams<GenericOptions, GenericSubjects> & {
    /**
     * @default "root"
     */
    displayName?: string;
});
/**
 * Execute a root command from process arguments.
 * 
 * `exec` creates an implicit `root` command, reads runtime arguments, parses options/subjects, then runs your handler.
 * 
 * ```ts
 * await SC.exec(() => {
 * 	// called for an empty root command
 * });
 * 
 * await SC.exec(
 * 	{
 * 		options: [SC.createBooleanOption("verbose", { aliases: ["v"] })],
 * 	},
 * 	({ options: { verbose } }) => {
 * 		if (verbose) {
 * 			// verbose mode
 * 		}
 * 	},
 * );
 * 
 * await SC.exec(
 * 	{
 * 		subjects: [SC.createArgument("taskName", DP.string())],
 * 	},
 * 	({ args }) => {
 * 		const { taskName } = args;
 * 		// taskName: string
 * 	},
 * );
 * 
 * ```
 * 
 * @remarks
 * Use this as the CLI entrypoint of your application.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/exec
 * @namespace SC
 * 
 */
export declare function exec(execute: () => void): Promise<void>;
export declare function exec<const GenericOptions extends AnyTuple<Option> = never, GenericSubjects extends Subjects = never>(params: ExecCommandParams<GenericOptions, GenericSubjects>, execute: (params: CreateCommandExecuteParams<GenericOptions, Extract<GenericSubjects, AnyTuple<Argument>>>) => MaybePromise<void>): Promise<void>;
