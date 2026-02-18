---
outline: [2, 3]
prev:
  text: "createBooleanOption"
  link: "/en/v0/api/command/createBooleanOption"
next:
  text: "createArrayOption"
  link: "/en/v0/api/command/createArrayOption"
description: "Creates an option with a single parsed value from a DataParser schema."
---

# createOption

Creates an option with a single parsed value from a DataParser schema.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createOption/main.ts-->
```

## Syntax

```typescript
function createOption<
  GenericName extends string,
  GenericSchema extends EligibleDataParser
>(
  name: GenericName,
  schema: GenericSchema,
  params: {
    description?: string
    aliases?: readonly string[]
    required: true
  }
): Option<GenericName, DP.Output<GenericSchema>>

function createOption<
  GenericName extends string,
  GenericSchema extends EligibleDataParser
>(
  name: GenericName,
  schema: GenericSchema,
  params?: {
    description?: string
    aliases?: readonly string[]
  }
): Option<GenericName, DP.Output<GenericSchema> | undefined>
```

## Parameters

- `name` (`string`) : option name used as `--name`.
- `schema` (`EligibleDataParser`) : parser used to validate/transform the value.
- `params` (optional) : option metadata and requirement behavior.
- `params.required` (`true`, optional) : throws when option is missing.
- `params.description` (`string`, optional) : help description.
- `params.aliases` (`string[]`, optional) : short aliases.

## Return value

- `Option<GenericName, DP.Output<GenericSchema>>` when `required: true`.
- `Option<GenericName, DP.Output<GenericSchema> | undefined>` otherwise.

## See also

- [`createBooleanOption`](/en/v0/api/command/createBooleanOption) - Builds a boolean flag option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
- [`create`](/en/v0/api/command/create) - Builds a command using this option.
