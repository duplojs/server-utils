Change the current working directory.

Update the current directory using a string path,
and return an Either ok/fail based on the result.
Use `setCurrentWorkingDirectoryOrThrow` if you prefer an exception-based failure flow.

```ts
{@include common/setCurrentWorkingDirectory/example.ts[3,11]}
```

@see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
