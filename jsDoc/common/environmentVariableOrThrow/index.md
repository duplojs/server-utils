Load and validate environment variables or throw.

Read environment variables with the same behavior as `environmentVariable`.
The result is returned directly instead of inside an Either.

If an env file cannot be read, this function throws `EnvironmentVariableError`.
It also throws when the final values do not match the DataParser shape.

```ts
{@include common/environmentVariableOrThrow/example.ts[4,36]}
```

@remarks
`EnvironmentVariableError.error` contains the original file read error or DataParser error.

@see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariableOrThrow
@see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariable
