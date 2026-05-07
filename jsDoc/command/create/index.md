Create a command node.

Use this builder to define a command name, optional options, optional command subjects, and the execute handler called after parsing.

```ts
{@include command/create/example.ts[4,40]}
```

@remarks
`subjects` accepts either:
- an array of `createArgument(...)` for positional arguments
- an array of child commands for nested command trees

When positional arguments are used, parsed values are exposed as `args` in the execute callback.

@see https://server-utils.duplojs.dev/en/v0/api/command/create
@namespace SC
