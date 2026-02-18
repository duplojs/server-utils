Create a command node.

Use this builder to define a command name, its optional options/subject, and the execute handler called after parsing.

```ts
{@include command/create/example.ts[4,36]}
```

@remarks
`create` supports child commands by setting `subject` to an array of commands.

@see https://server-utils.duplojs.dev/en/v0/api/command/create
@namespace SC
