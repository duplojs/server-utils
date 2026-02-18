import { initOption } from "./base";

/**
 * {@include command/createBooleanOption/index.md}
 */
export function createBooleanOption<
	GenericName extends string,
>(
	name: GenericName,
	params?: {
		description?: string;
		aliases?: readonly string[];
	},
) {
	return initOption(
		name,
		({ isHere }) => isHere,
		params,
	);
}
