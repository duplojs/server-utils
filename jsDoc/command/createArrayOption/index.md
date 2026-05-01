Create an option that parses an array of values.

This option parses a delimited string value into an array and validates each element with the provided DataParser or clean contract.

```ts
{@include command/createArrayOption/example.ts[4,37]}
```

@remarks
The default separator is `,`. You can customize it with `separator`, and primitive elements are coerced from CLI string input.

@see https://server-utils.duplojs.dev/en/v0/api/command/createArrayOption
@namespace SC
