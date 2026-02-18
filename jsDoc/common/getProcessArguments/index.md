Get process arguments passed from the command line.

Return runtime arguments after the executable/script part, as a `string[]` ready to consume in your app.

```ts
{@include common/getProcessArguments/example.ts[4,20]}
```

@remarks
On Node.js and Bun, arguments are memoized after the first call.

@see https://server-utils.duplojs.dev/en/v0/api/common/getProcessArguments
