import { type MaybePromise } from "@duplojs/utils";
import { type CreateCommandExecuteParams, type CreateCommandParams, type Subject } from "./create";
import { type Option } from "./options";
/**
 * Execute a root command from process arguments.
 * 
 * `exec` creates an implicit `root` command, reads runtime arguments, parses options/subject, then runs your handler.
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
 * 		subject: DP.tuple([DP.string()]),
 * 	},
 * 	({ subject }) => {
 * 		if (subject) {
 * 			const [taskName] = subject;
 * 			// taskName: string
 * 		}
 * 	},
 * );
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
export declare function exec<GenericOptions extends readonly Option[], GenericSubject extends Subject>(params: CreateCommandParams<GenericOptions, GenericSubject>, execute: (params: CreateCommandExecuteParams<GenericOptions, GenericSubject>) => MaybePromise<void>): Promise<void>;
