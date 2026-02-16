import { initOption } from "./base";

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
