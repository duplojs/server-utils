import { SC } from "@duplojs/server-utils";

const helloCommand = SC.create(
	"hello",
	() => {
		console.log("hello");
	},
);
