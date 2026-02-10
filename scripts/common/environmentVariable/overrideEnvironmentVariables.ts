import { A, O, pipe } from "@duplojs/utils";

export function overrideEnvironmentVariables(
	arrayEnv: Record<string, string>[],
	override: boolean,
) {
	return pipe(
		arrayEnv,
		A.map(O.entries),
		A.flat,
		(entries) => override
			? entries
			: A.reverse(entries),
		O.fromEntries,
	);
}
