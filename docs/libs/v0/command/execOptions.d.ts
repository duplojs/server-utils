import type { SimplifyTopLevel } from "@duplojs/utils";
import { type Option } from "./options";
type ComputeResult<GenericOptions extends [Option, ...Option[]]> = SimplifyTopLevel<{
    [GenericOption in GenericOptions[number] as GenericOption extends Option<infer GenericName, unknown> ? GenericName : never]: GenericOption extends Option<string, infer GenericResult> ? GenericResult : never;
}>;
/**
 * Execute command options from process arguments.
 * 
 * `execOptions` reads runtime arguments, executes each option parser, and returns an object keyed by option name. 
 * It also adds an automatic `--help` / `-h` manual generated from the declared options.
 * 
 * ```ts
 * const portOption = SC.createOption(
 * 	"port",
 * 	DP.coerce.number(),
 * 	{
 * 		description: "HTTP port",
 * 		required: true,
 * 	},
 * );
 * const portResult = SC.execOptions(portOption);
 * // portResult.port: number
 * 
 * const tagOption = SC.createArrayOption(
 * 	"tag",
 * 	DP.string(),
 * 	{
 * 		aliases: ["t"],
 * 		required: true,
 * 	},
 * );
 * const forceOption = SC.createBooleanOption("force");
 * 
 * const options = SC.execOptions(tagOption, forceOption);
 * // options.tag: string[] | undefined
 * ```
 * 
 * @remarks
 * Use this helper when your CLI only needs option parsing and does not need a command subject.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/execOptions
 * @namespace SC
 * 
 */
export declare function execOptions<GenericOptions extends [Option, ...Option[]]>(...options: GenericOptions): ComputeResult<GenericOptions>;
export {};
