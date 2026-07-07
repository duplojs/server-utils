Create an option that parses an array of values.

The option reads one value from `--name=value` or `--name value`.
It splits the value with `separator`.
Each item is parsed with the provided DataParser or clean contract.
Aliases match the same value syntax.

```ts
{@include command/createArrayOption/example.ts[4,37]}
```

@remarks
The default separator is `,`.
`min` and `max` are applied after splitting.
Primitive elements are coerced from CLI string input automatically.
The first matching option token is consumed.

@see https://server-utils.duplojs.dev/en/v0/api/command/createArrayOption
@namespace SC
