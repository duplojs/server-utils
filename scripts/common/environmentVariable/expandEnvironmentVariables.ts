import { G, O, S } from "@duplojs/utils";

const envVarRegex = /(?<!\\)\${(?<value>[^{}]+)}/g;
const escapedDollarRegex = /\\\$/g;

export function expandValue(
	value: string,
	env: Record<string, string>,
	stack = new Set<string>(),
): string {
	return S.replace(
		value,
		envVarRegex,
		({ namedGroups }) => {
			const value = namedGroups!.value!;

			const rawEnvValue = env[value];

			if (rawEnvValue === undefined || stack.has(value)) {
				return "";
			}

			stack.add(value);

			const resolved = expandValue(rawEnvValue, env, stack);

			stack.delete(value);

			return resolved;
		},
	);
}

export function expandEnvironmentVariables(env: Record<string, string>) {
	return G.reduce(
		O.entries(env),
		G.reduceFrom<Record<string, string>>(env),
		({ element: [key, value], lastValue, nextWithObject }) => nextWithObject(
			lastValue,
			{
				[key]: S.replaceAll(
					expandValue(value, lastValue),
					escapedDollarRegex,
					"$",
				),
			},
		),
	);
}
