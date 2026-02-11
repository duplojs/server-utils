Load and validate environment variables.

Read variables from runtime environment and optional env files, expand references, validate values with a DataParser shape, and return an Either result.

```ts
{@include common/environmentVariable/example.ts[4,32]}
```

@remarks
Set `justRead` to `true` to avoid mutating runtime environment variables after parsing.

@see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariable
