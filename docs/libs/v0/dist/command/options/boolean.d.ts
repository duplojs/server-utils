import { type Kind } from "@duplojs/utils";
import { type Option } from "./base";
export declare const booleanOptionKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-boolean-option", unknown>>;
type _BooleanOption<GenericName extends string = string> = (Option<GenericName, boolean> & Kind<typeof booleanOptionKind.definition>);
export interface BooleanOption<GenericName extends string = string> extends _BooleanOption<GenericName> {
}
/**
 * Create a boolean flag option.
 * 
 * This option is `true` when present in arguments and `false` when absent.
 * 
 * ```ts
 * const verbose = SC.createBooleanOption("verbose");
 * 
 * const force = SC.createBooleanOption(
 * 	"force",
 * 	{
 * 		aliases: ["f"],
 * 		description: "Force operation",
 * 	},
 * );
 * 
 * SC.create(
 * 	"deploy",
 * 	{
 * 		options: [verbose, force],
 * 	},
 * 	({ options: { verbose, force } }) => {
 * 		// verbose: boolean
 * 		// force: boolean
 * 	},
 * );
 * ```
 * 
 * @remarks
 * Boolean options do not consume a value.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/createBooleanOption
 * @namespace SC
 * 
 */
export declare function createBooleanOption<GenericName extends string>(name: GenericName, params?: {
    description?: string;
    aliases?: readonly string[];
}): BooleanOption<GenericName>;
export {};
