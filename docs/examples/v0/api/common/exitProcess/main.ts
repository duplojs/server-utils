import { exitProcess } from "@server-utils/v0";

const shouldTerminate = false;

if (shouldTerminate) {
	exitProcess(1);
}

const hasFatalError = false;

if (hasFatalError) {
	exitProcess();
}
