Execute a root command from process arguments.

`exec` creates an implicit `root` command, reads runtime arguments, parses options/subjects, then runs your handler.
`displayName` changes the implicit command name.

```ts
{@include command/exec/example.ts[4,30]}
```

@remarks
`--help` and `-h` print the generated help and exit with code `0`.
Command parsing errors are printed to stderr and exit with code `1`.
Errors thrown by the handler are not caught.

@see https://server-utils.duplojs.dev/en/v0/api/command/exec
@namespace SC
