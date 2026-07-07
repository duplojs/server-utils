Controls if env files can replace existing runtime values.

When `false` or omitted, runtime values keep priority.
When `true`, values read from `includedFiles` can replace matching runtime values.

This is applied before `${VARIABLE}` references are expanded and before validation.

@default false
