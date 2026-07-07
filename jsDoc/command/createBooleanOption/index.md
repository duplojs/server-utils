Create a boolean flag option.

This option is `true` when present in arguments and `false` when absent.
Aliases match the same flag syntax.

```ts
{@include command/createBooleanOption/example.ts[3,22]}
```

@remarks
Boolean options do not consume a value.
The first matching option token is consumed.

@see https://server-utils.duplojs.dev/en/v0/api/command/createBooleanOption
@namespace SC
