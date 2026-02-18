declare module "../implementor" {
    interface ServerUtilsFunction {
        exitProcess(code?: number): void;
    }
}
/**
 * Exit the current process with an optional exit code.
 * 
 * Stop the current runtime immediately, using `0` by default or a custom numeric status code.
 * 
 * ```ts
 * exitProcess();
 * // exits with default code (0)
 * 
 * exitProcess(1);
 * // exits with a generic failure code
 * 
 * const validationFailed = true;
 * if (validationFailed) {
 * 	exitProcess(2);
 * }
 * // exits with a custom application code
 * ```
 * 
 * @remarks
 * Any code after `exitProcess(...)` will not run.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/exitProcess
 * 
 */
export declare const exitProcess: (code?: number) => void;
