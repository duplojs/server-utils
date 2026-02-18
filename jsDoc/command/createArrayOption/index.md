Create an option that parses an array of values.

This option parses a delimited string value into an array and validates each element with the provided DataParser schema.

```ts
{@include command/createArrayOption/example.ts[4,31]}
```

@remarks
The default separator is `,`. You can customize it with `separator`.

@see https://server-utils.duplojs.dev/en/v0/api/command/createArrayOption
@namespace SC
