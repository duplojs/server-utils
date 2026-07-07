Controls if the final variables are written back to the runtime environment.

When `false` or omitted, a valid result updates the runtime environment.
When `true`, the function only returns the parsed values.
It does not change `process.env` or `Deno.env`.
File reading, variable expansion, and validation still run the same way.

@default false
