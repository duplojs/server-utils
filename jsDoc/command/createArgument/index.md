Create a positional argument parser for command subjects.

Create an argument with a name and a parsing spec.
The argument reads one positional value.

```ts
{@include command/createArgument/example.ts[4,35]}
```

@remarks
When an optional argument is missing, its value is `undefined`.
When a required argument is missing, parsing returns a command error.
Parsed values are exposed as `args.<argumentName>`.

@see https://server-utils.duplojs.dev/en/v0/api/command/createArgument
@namespace SC
