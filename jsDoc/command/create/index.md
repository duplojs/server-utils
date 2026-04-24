Create a command node.

Use this builder to define a command name, optional options, an optional subject, and the execute handler called after parsing.

```ts
{@include command/create/example.ts[4,40]}
```

@remarks
`subject` can be a parser-like contract for positional arguments, or an array of child commands for nested command trees.

@see https://server-utils.duplojs.dev/en/v0/api/command/create
@namespace SC
