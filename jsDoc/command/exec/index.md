Execute a root command from process arguments.

`exec` creates an implicit `root` command, reads runtime arguments, parses options/subject, then runs your handler.

```ts
{@include command/exec/example.ts[4,29]}
```

@remarks
Use this as the CLI entrypoint of your application.

@see https://server-utils.duplojs.dev/en/v0/api/command/exec
@namespace SC
