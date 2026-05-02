import { SC } from "@server-utils/v0";

const helloCommand = SC.create(
	"hello",
	() => {
		console.log("hello");
	},
);
