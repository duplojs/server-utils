/**
 * Return the current working directory or throw.
 * 
 * Return the current path directly and throw if the runtime cannot read it.
 * 
 * ```ts
 * const cwd = getCurrentWorkDirectoryOrThrow();
 * // cwd: string
 * 
 * setCurrentWorkingDirectory("/tmp");
 * const after = getCurrentWorkDirectoryOrThrow();
 * // after: string
 * 
 * const path = getCurrentWorkDirectoryOrThrow();
 * // path: string
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/getCurrentWorkDirectoryOrThrow
 * 
 */
export declare const getCurrentWorkDirectoryOrThrow: () => string;
