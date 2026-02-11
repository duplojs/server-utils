Load and validate environment variables or throw.

Read environment variables using the same behavior as `environmentVariable`, but throw `EnvironmentVariableError` when a file cannot be read or schema validation fails.

```ts
{@include common/environmentVariableOrThrow/example.ts[4,36]}
```

@remarks
The thrown `EnvironmentVariableError` contains the original left value in its `error` property.

@see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariableOrThrow
@see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariable