import { A, equal, S } from "@duplojs/utils";
import { getProcessArguments } from "@scripts";

const args = getProcessArguments();
// ["--port=3000", "--env=dev"]

const portArg = A.find(
	getProcessArguments(),
	S.startsWith("--port="),
);
// "--port=3000" | undefined

const hasVerboseFlag = A.some(
	getProcessArguments(),
	equal("--verbose"),
);
// true | false

const [command] = getProcessArguments();
// first positional argument if provided
