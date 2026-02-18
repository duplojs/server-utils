import { exitProcess } from "@scripts";

exitProcess();
// exits with default code (0)

exitProcess(1);
// exits with a generic failure code

const validationFailed = true;
if (validationFailed) {
	exitProcess(2);
}
// exits with a custom application code
