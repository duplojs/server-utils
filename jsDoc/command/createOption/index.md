Create an option with a single parsed value.

The option reads one value from `--name=value` or `--name value`.
The value is parsed with the provided DataParser or clean contract.
Aliases match the same value syntax.

```ts
{@include command/createOption/example.ts[4,36]}
```

@remarks
Primitive parsers and clean primitive contracts are coerced from CLI string input automatically.
When the next value is another option, parsing returns a command error.
The first matching option token is consumed.

@see https://server-utils.duplojs.dev/en/v0/api/command/createOption
@namespace SC
