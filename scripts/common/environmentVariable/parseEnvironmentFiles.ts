import { E, G, innerPipe, pipe, S, when } from "@duplojs/utils";
import * as SF from "@scripts/file";

const lineRegex = /^(?:export\s+)?(?<key>[A-Z_][A-Z0-9_]*)=(?<value>'(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|[^\s#\r\n][^#\r\n]*|)\s*(?:#.*)?$/mg;
const endLineBreakerRegex = /\r\n?/mg;
const surroundingQuoteRegex = /^(['"`])([\s\S]*)\1$/mg;
const backCartRegex = /\\r/g;
const newLineRegex = /\\n/g;

export function parseEnvironmentLine(line: string) {
	return pipe(
		line,
		S.replace(endLineBreakerRegex, "\n"),
		S.extractAll(lineRegex),
		G.reduce(
			G.reduceFrom<Record<string, string>>({}),
			({ element, nextWithObject, lastValue, next }) => {
				if (element.namedGroups?.key && element.namedGroups?.value) {
					return nextWithObject(
						lastValue,
						{
							[element.namedGroups.key]: pipe(
								element.namedGroups.value,
								(value) => {
									const surroundingValue = S.replace(value, surroundingQuoteRegex, "$2");

									if (S.startsWith(value, "\"")) {
										return pipe(
											surroundingValue,
											S.replace(newLineRegex, "\n"),
											S.replace(backCartRegex, "\r"),
										);
									}

									return surroundingValue;
								},
							),
						},
					);
				}
				return next(lastValue);
			},
		),
	);
}

export function parseEnvironmentFiles(
	baseEnv: Record<string, string>,
	paths: string[],
) {
	return G.asyncReduce(
		paths,
		G.reduceFrom<Record<string, string>[]>([baseEnv]),
		({ lastValue, element, nextPush, exit }) => SF
			.readTextFile(element)
			.then(
				innerPipe(
					E.whenIsRight(
						innerPipe(
							parseEnvironmentLine,
							(value) => nextPush(lastValue, value),
						),
					),
					when(
						E.isLeft,
						exit,
					),
				),
			),
	);
}
