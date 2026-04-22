Execute command options from process arguments.

`execOptions` reads runtime arguments, executes each option parser, and returns an object keyed by option name. 
It also adds an automatic `--help` / `-h` manual generated from the declared options.

```ts
{@include command/execOptions/example.ts[4,26]}
```

@remarks
Use this helper when your CLI only needs option parsing and does not need a command subject.

@see https://server-utils.duplojs.dev/en/v0/api/command/execOptions
@namespace SC
