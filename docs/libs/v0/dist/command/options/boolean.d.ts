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
}): import("./base").Option<GenericName, boolean>;
