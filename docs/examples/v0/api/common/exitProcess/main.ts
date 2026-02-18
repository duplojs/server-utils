import { exitProcess } from "@duplojs/server-utils";

const shouldTerminate = false;

if (shouldTerminate) {
	exitProcess(1);
}

const hasFatalError = false;

if (hasFatalError) {
	exitProcess();
}
