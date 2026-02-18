declare module "../implementor" {
    interface ServerUtilsFunction {
        getProcessArguments(): string[];
    }
}
/**
 * Get process arguments passed from the command line.
 * 
 * Return runtime arguments after the executable/script part, as a `string[]` ready to consume in your app.
 * 
 * ```ts
 * const args = getProcessArguments();
 * // ["--port=3000", "--env=dev"]
 * 
 * const portArg = A.find(
 * 	getProcessArguments(),
 * 	S.startsWith("--port="),
 * );
 * // "--port=3000" | undefined
 * 
 * const hasVerboseFlag = A.some(
 * 	getProcessArguments(),
 * 	equal("--verbose"),
 * );
 * // true | false
 * 
 * const [command] = getProcessArguments();
 * // first positional argument if provided
 * ```
 * 
 * @remarks
 * On Node.js and Bun, arguments are memoized after the first call.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/getProcessArguments
 * 
 */
export declare const getProcessArguments: () => string[];
