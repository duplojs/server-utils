Exit the current process with an optional exit code.

Stop the current runtime immediately, using `0` by default or a custom numeric status code.

```ts
{@include common/exitProcess/example.ts[3,13]}
```

@remarks
Any code after `exitProcess(...)` will not run.

@see https://server-utils.duplojs.dev/en/v0/api/common/exitProcess
