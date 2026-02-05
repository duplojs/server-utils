import { TESTImplementation, implementFunction, setEnvironment, SupportedEnvironment } from "@scripts/implementor";

describe("implementor", () => {
	afterEach(() => {
		setEnvironment("NODE");
		TESTImplementation.clear();
		vi.clearAllMocks();
	});

	it("includes TEST in supported environments", () => {
		expect(SupportedEnvironment.TEST).toBe("TEST");
	});

	it("stores and retrieves TEST implementations", () => {
		const implementation = vi.fn();

		TESTImplementation.set("exists", implementation as never);

		expect(TESTImplementation.get("exists")).toBe(implementation);

		TESTImplementation.clear();

		expect(TESTImplementation.get("exists")).toBeUndefined();
	});

	it("uses NODE implementation by default", () => {
		setEnvironment("NODE");
		const nodeImplementation = vi.fn().mockReturnValue("node-result");
		const runtimeFunction = implementFunction(
			"getCurrentWorkDirectory",
			{ NODE: nodeImplementation as never },
		);

		expect(runtimeFunction()).toBe("node-result");
		expect(nodeImplementation).toHaveBeenCalledTimes(1);
	});

	it("falls back to NODE implementation for BUN and DENO when missing", () => {
		const nodeImplementation = vi.fn().mockReturnValue("node-result");
		const runtimeFunction = implementFunction(
			"getCurrentWorkDirectory",
			{ NODE: nodeImplementation as never },
		);

		setEnvironment("BUN");
		expect(runtimeFunction()).toBe("node-result");

		setEnvironment("DENO");
		expect(runtimeFunction()).toBe("node-result");

		expect(nodeImplementation).toHaveBeenCalledTimes(2);
	});

	it("uses the TEST implementation when TEST environment is selected", () => {
		setEnvironment("TEST");
		const testImplementation = vi.fn().mockReturnValue("test-result");
		const runtimeFunction = implementFunction(
			"getCurrentWorkDirectory",
			{ NODE: vi.fn() as never },
		);

		TESTImplementation.set("getCurrentWorkDirectory", testImplementation as never);

		expect(runtimeFunction()).toBe("test-result");
		expect(testImplementation).toHaveBeenCalledTimes(1);
	});

	it("throws when TEST environment implementation is missing", () => {
		setEnvironment("TEST");
		const runtimeFunction = implementFunction(
			"getCurrentWorkDirectory",
			{ NODE: vi.fn() as never },
		);

		expect(() => runtimeFunction()).toThrowError(
			"Missing function implementation \"getCurrentWorkDirectory\" in TEST environment.",
		);
	});
});
