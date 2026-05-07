Create a positional argument parser for command subjects.

Use this builder to define an argument name, a parsing spec, and optional metadata (`description`, `optional`) used by command help and execution.

```ts
{@include command/createArgument/example.ts[4,35]}
```

@remarks
`createArgument` is designed to be used inside `subjects` for [`create`](/en/v0/api/command/create) or [`exec`](/en/v0/api/command/exec).  
Parsed values are exposed in the execute callback as `args.<argumentName>`.

@see https://server-utils.duplojs.dev/en/v0/api/command/createArgument
@namespace SC
