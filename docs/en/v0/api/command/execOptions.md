---
outline: [2, 3]
prev:
  text: "exec"
  link: "/en/v0/api/command/exec"
next:
  text: "create"
  link: "/en/v0/api/command/create"
description: "Parses CLI options from runtime arguments."
---

# execOptions

`execOptions` parses CLI options and returns the result as a `{ [optionName]: resultOption }` record.
If parsing fails, a detailed error is printed to the console.
The `--help` / `-h` output is generated automatically from the declared options.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/execOptions/main.ts-->
```

## Syntax

```typescript
function execOptions<
  GenericOptions extends [Option, ...Option[]]
>(
  ...options: GenericOptions
): ComputeResult<GenericOptions>
```

## Parameters

- `options` (`[Option, ...Option[]]`) : options to parse from runtime arguments.

## Return value

- `ComputeResult<GenericOptions>` : object whose keys are option names and whose values are the typed result of each parser.

## See also

- [`exec`](/en/v0/api/command/exec) - Runs a full command from runtime arguments.
- [`createBooleanOption`](/en/v0/api/command/createBooleanOption) - Builds a boolean flag option.
- [`createOption`](/en/v0/api/command/createOption) - Builds a single-value option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
