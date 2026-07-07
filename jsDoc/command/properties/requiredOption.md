Controls the behavior when the option is absent.

When `false` or omitted, a missing option returns `undefined`.
When `true`, a missing option adds a command error.

For `exec` and `execOptions`, this command error is printed to stderr and the process exits with code `1`.

@default false
