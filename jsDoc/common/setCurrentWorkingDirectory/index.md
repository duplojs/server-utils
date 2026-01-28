Change the current working directory.

Update the current directory using a string path or URL,
and return an Either ok/fail based on the result.

```ts
{@include common/setCurrentWorkingDirectory/example.ts[3,7]}
```

@remarks URLs are decoded to a filesystem path.

@see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
