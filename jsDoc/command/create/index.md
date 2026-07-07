Create a command node.

Create a command with a name, options, subjects, and a handler.
The handler runs after parsing.

```ts
{@include command/create/example.ts[4,40]}
```

@remarks
`subjects` can be a list of arguments or a list of child commands.
Arguments are read in order and exposed as `args`.
With child commands, the first remaining value selects the child command.

@see https://server-utils.duplojs.dev/en/v0/api/command/create
@namespace SC
