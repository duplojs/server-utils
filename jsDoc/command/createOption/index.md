Create an option with a single parsed value.

Use a DataParser or a clean contract to parse and validate the option value from `--name=value` or `--name value`.

```ts
{@include command/createOption/example.ts[4,36]}
```

@remarks
Primitive parsers and clean primitive contracts are coerced from CLI string input automatically.

@see https://server-utils.duplojs.dev/en/v0/api/command/createOption
@namespace SC
