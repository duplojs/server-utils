Get process arguments passed from the command line.

Return runtime arguments after the executable/script part, as a `string[]` ready to consume in your app.

```ts
{@include common/getProcessArguments/example.ts[4,20]}
```

@remarks
On Node.js and Bun, arguments are captured on the first call.
Later calls return the same array, even if the runtime arguments change.

@see https://server-utils.duplojs.dev/en/v0/api/common/getProcessArguments
