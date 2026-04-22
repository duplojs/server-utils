import { hasSomeKinds, isType, justReturn, pipe, Printer } from "@duplojs/utils";
import * as AA from "@duplojs/utils/array";
import * as PP from "@duplojs/utils/pattern";
import * as DDP from "@duplojs/utils/dataParser";
import type { Command } from "./create";
import type { Option } from "./options";

/**
 * @internal
 */
export function formatSubject(subject: DDP.DataParser): string {
	return PP.match(subject)
		.when(
			DDP.identifier(DDP.stringKind),
			justReturn("string"),
		)
		.when(
			DDP.identifier(DDP.numberKind),
			justReturn("number"),
		)
		.when(
			DDP.identifier(DDP.bigIntKind),
			justReturn("bigint"),
		)
		.when(
			DDP.identifier(DDP.dateKind),
			justReturn("date"),
		)
		.when(
			DDP.identifier(DDP.timeKind),
			justReturn("time"),
		)
		.when(
			DDP.identifier(DDP.nilKind),
			justReturn("null"),
		)
		.when(
			DDP.identifier(DDP.literalKind),
			(subject) => pipe(
				subject.definition.value,
				AA.map(String),
				AA.join(" | "),
			),
		)
		.when(
			DDP.identifier(DDP.templateLiteralKind),
			(subject) => pipe(
				subject.definition.template,
				AA.map(
					(part) => DDP.identifier(part, DDP.dataParserKind)
						? `\${${formatSubject(part)}}`
						: String(part),
				),
				AA.join(""),
			),
		)
		.when(
			DDP.identifier(DDP.unionKind),
			(subject) => pipe(
				subject.definition.options,
				AA.map(formatSubject),
				AA.join(" | "),
			),
		)
		.when(
			DDP.identifier(DDP.arrayKind),
			(subject) => `${formatSubject(subject.definition.element)}[]`,
		)
		.when(
			DDP.identifier(DDP.tupleKind),
			(subject) => {
				const parts = pipe(
					subject.definition.shape,
					AA.map(formatSubject),
					AA.join(", "),
				);
				const rest = subject.definition.rest
					? `${parts ? ", " : ""}...${formatSubject(subject.definition.rest)}[]`
					: "";

				return `[${parts}${rest}]`;
			},
		)
		.otherwise(justReturn("unknown"));
}

/**
 * @internal
 */
export function renderOptionsHelp(
	options: readonly Option[],
	depth: number,
): string {
	return Printer.renderParagraph(
		[
			`${Printer.indent(depth)}${Printer.colorizedBold("OPTIONS:", "blue")}`,
			AA.map(
				options,
				(option) => Printer.renderParagraph(
					[
						AA.join(
							[
								Printer.indent(depth),
								Printer.dash,
								Printer.colorized(` ${option.name}: `, "cyan"),
								Printer.colorized(
									pipe(
										option.aliases,
										AA.map((alias) => `-${alias},`),
										AA.push(`--${option.name}`),
										AA.join(" "),
									),
									"gray",
								),
							],
							"",
						),
						option.description
						&& `${Printer.indent(depth)}  ${option.description}`,
					],
				),
			),
		],
	);
}

/**
 * @internal
 */
export function renderCommandHelp(
	command: Command,
	depth: number,
): string[] {
	const logs: string[] = [];

	logs.push(
		`${Printer.indent(depth)}${Printer.colorizedBold("NAME:", "green")}${command.name}`,
	);

	if (command.description) {
		logs.push(
			Printer.renderParagraph(
				[
					`${Printer.indent(depth + 1)}${Printer.colorizedBold("DESCRIPTION:", "cyan")}`,
					`${Printer.indent(depth + 1)}${command.description}`,
				],
			),
		);
	}

	if (AA.minElements(command.options, 1)) {
		logs.push(renderOptionsHelp(command.options, depth + 1));
	}

	if (isType(command.subject, "array")) {
		for (const childCommand of command.subject) {
			logs.push(...renderCommandHelp(childCommand, depth + 1));
		}
	} else if (DDP.identifier(command.subject, DDP.dataParserKind)) {
		const formattedSubject = formatSubject(command.subject);

		logs.push(
			AA.join(
				[
					Printer.indent(depth + 1),
					Printer.colorizedBold("SUBJECT:", "magenta"),
					hasSomeKinds(command.subject, [DDP.tupleKind, DDP.arrayKind])
						? formattedSubject
						: `<${formattedSubject}>`,
				],
				"",
			),
		);
	}

	return logs;
}

export function logCommandHelp(
	command: Command,
	depth = 0,
) {
	// eslint-disable-next-line no-console
	console.log(
		Printer.renderParagraph(
			renderCommandHelp(command, depth),
		),
	);
}

/**
 * @internal
 */
export function renderExecOptionHelp(
	options: readonly Option[],
	depth: number,
): string[] {
	return [
		`${Printer.indent(depth)}${Printer.colorizedBold("OPTION HELP", "green")}`,
		renderOptionsHelp(options, depth + 1),
	];
}

export function logExecOptionHelp(
	options: readonly Option[],
	depth = 0,
) {
	// eslint-disable-next-line no-console
	console.log(
		Printer.renderParagraph(
			renderExecOptionHelp(options, depth),
		),
	);
}
