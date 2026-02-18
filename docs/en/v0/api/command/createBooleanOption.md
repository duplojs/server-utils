---
outline: [2, 3]
prev:
  text: "create"
  link: "/en/v0/api/command/create"
next:
  text: "createOption"
  link: "/en/v0/api/command/createOption"
description: "Creates a boolean flag option that is true when present and false when absent."
---

# createBooleanOption

Creates a boolean flag option that is `true` when present and `false` when absent.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createBooleanOption/main.ts-->
```

## Syntax

```typescript
function createBooleanOption<GenericName extends string>(
  name: GenericName,
  params?: {
    description?: string
    aliases?: readonly string[]
  }
): Option<GenericName, boolean>
```

## Parameters

- `name` (`string`) : option name used as `--name`.
- `params` (optional) : extra option metadata.
- `params.description` (`string`, optional) : help description.
- `params.aliases` (`string[]`, optional) : short aliases like `-v`.

## Return value

- `Option<GenericName, boolean>` : option parser returning a boolean.

## See also

- [`createOption`](/en/v0/api/command/createOption) - Builds a single-value option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
- [`create`](/en/v0/api/command/create) - Builds a command using this option.
