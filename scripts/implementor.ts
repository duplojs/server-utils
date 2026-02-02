/* eslint-disable @typescript-eslint/consistent-type-imports */
import { type AnyFunction, createEnum, createGlobalStore, type GetEnumValue, type MaybePromise, memoPromise } from "@duplojs/utils";

export interface ServerUtilsFunction {}

export const SupportedEnvironment = createEnum(["BUN", "DENO", "NODE"]);
export type SupportedEnvironment = GetEnumValue<typeof SupportedEnvironment>;

const SymbolEnvironmentStore = Symbol("environmentStore");
type SymbolEnvironmentStore = typeof SymbolEnvironmentStore;

declare module "@duplojs/utils" {
	interface GlobalStore {
		[SymbolEnvironmentStore]: SupportedEnvironment;
	}
}

const environmentStoreHandler = createGlobalStore(
	SymbolEnvironmentStore,
	(() => {
		if (typeof Deno !== "undefined") {
			return "DENO";
		}
		if (typeof Bun !== "undefined") {
			return "BUN";
		}
		if (typeof process !== "undefined" && process.versions?.node) {
			return "NODE";
		}

		return "NODE";
	})(),
);

/**
 * {@include setEnvironment.md}
 */
export function setEnvironment(environment: SupportedEnvironment) {
	environmentStoreHandler.set(environment);
}

export function implementFunction<
	GenericFunctionName extends keyof ServerUtilsFunction,
>(
	functionName: GenericFunctionName,
	theFunctions: {
		NODE: ServerUtilsFunction[GenericFunctionName];
		BUN?: ServerUtilsFunction[GenericFunctionName];
		DENO?: ServerUtilsFunction[GenericFunctionName];
	},
): ServerUtilsFunction[GenericFunctionName] {
	theFunctions.BUN ||= theFunctions.NODE;
	theFunctions.DENO ||= theFunctions.NODE;

	return (...args: unknown[]) => (
		theFunctions[environmentStoreHandler.value] as AnyFunction
	)(...args);
}

function createImportCache<
	GenericOutput extends unknown,
>(
	theFunction: () => Promise<GenericOutput>,
) {
	const memo = {
		get value(): MaybePromise<GenericOutput> {
			return theFunction()
				.then((value) => {
					Object.defineProperty(
						memo,
						"value",
						{
							value,
						},
					);
					return value;
				});
		},
	};

	return memo;
}

export const nodeFileSystem = memoPromise(() => import("node:fs/promises") as Promise<typeof import("node:fs/promises")>);
export const nodeCrypto = memoPromise(() => import("node:crypto") as Promise<typeof import("node:crypto")>);
export const nodeOs = memoPromise(() => import("node:os") as Promise<typeof import("node:os")>);
