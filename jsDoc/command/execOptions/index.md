Execute command options from process arguments.

`execOptions` reads runtime arguments, executes each option parser, and resolves to an object keyed by option name.
It also adds automatic `--help` and `-h` output.
Remaining values are ignored.

```ts
{@include command/execOptions/example.ts[4,28]}
```

@remarks
`--help` and `-h` print the generated option help and exit with code `0`.
Option parsing errors are printed to stderr and exit with code `1`.

@see https://server-utils.duplojs.dev/en/v0/api/command/execOptions
@namespace SC
