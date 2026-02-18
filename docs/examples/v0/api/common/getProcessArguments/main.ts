import { A, type ExpectType, S } from "@duplojs/utils";
import { getProcessArguments } from "@duplojs/server-utils";

const argumentsList = getProcessArguments();

const portArgument = A.find(
	argumentsList,
	S.startsWith("--port="),
);
type check = ExpectType<
	typeof portArgument,
	`--port=${string}` | undefined,
	"strict"
>;

if (A.includes(argumentsList, "--verbose")) {
	// has verbose flag
}
