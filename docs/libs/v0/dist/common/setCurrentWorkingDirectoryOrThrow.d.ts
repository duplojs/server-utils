declare const SetCurrentWorkingDirectoryError_base: new (params: {
    "@DuplojsServerUtils/set-working-directory-error"?: unknown;
}, parentParams: readonly [message?: string | undefined, options?: ErrorOptions | undefined]) => Error & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/set-working-directory-error", unknown>, unknown> & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"set-working-directory-error", unknown>, unknown>;
export declare class SetCurrentWorkingDirectoryError extends SetCurrentWorkingDirectoryError_base {
    constructor();
}
/**
 * Change the current working directory or throw.
 * 
 * Update the current directory using the same behavior as `setCurrentWorkingDirectory`, but throw `SetCurrentWorkingDirectoryError` when the runtime cannot switch to the provided path.
 * 
 * ```ts
 * import { SetCurrentWorkingDirectoryError, getCurrentWorkDirectoryOrThrow, setCurrentWorkingDirectoryOrThrow } from "..";
 * 
 * setCurrentWorkingDirectoryOrThrow("/tmp/project");
 * const firstPath = getCurrentWorkDirectoryOrThrow();
 * // firstPath: string ("/tmp/project")
 * 
 * const nextPath = "/tmp/another-project";
 * setCurrentWorkingDirectoryOrThrow(nextPath);
 * const secondPath = getCurrentWorkDirectoryOrThrow();
 * // secondPath: string ("/tmp/another-project")
 * 
 * try {
 * 	setCurrentWorkingDirectoryOrThrow("/tmp/missing-project");
 * } catch (error) {
 * 	if (error instanceof SetCurrentWorkingDirectoryError) {
 * ```
 * 
 * @remarks
 * Use this variant when changing the current working directory is required and you want an exception-based failure flow instead of handling an `Either`.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
 * 
 */
export declare function setCurrentWorkingDirectoryOrThrow<GenericPath extends string>(path: GenericPath): void;
export {};
