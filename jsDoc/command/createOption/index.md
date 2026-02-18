Create an option with a single parsed value.

Use a DataParser schema to parse and validate the option value from `--name=value` or `--name value`.

```ts
{@include command/createOption/example.ts[4,27]}
```

@remarks
Set `required: true` to throw when the option is missing.

@see https://server-utils.duplojs.dev/en/v0/api/command/createOption
@namespace SC
