Load and validate environment variables.

Read variables from the runtime environment and from optional env files.
Then merge them, expand `${VARIABLE}` references, validate the values with a DataParser object shape, and return an Either result.

Runtime values are the base source.
Files from `includedFiles` are read in the order you give.
By default, runtime values keep priority over file values.
When `override` is `true`, file values can replace runtime values.

After the merge, references like `${HOST}` are replaced with the final value of `HOST`.
Missing references and circular references become an empty string.
Escaped dollar references keep their `$$`.

When validation succeeds, the parsed object is returned in `E.Success`.
Unless `justRead` is `true`, the final environment is also written back to the runtime.

```ts
{@include common/environmentVariable/example.ts[4,32]}
```

@see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariable
