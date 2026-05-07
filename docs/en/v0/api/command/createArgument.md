---
outline: [2, 3]
prev:
  text: "create"
  link: "/en/v0/api/command/create"
next:
  text: "createBooleanOption"
  link: "/en/v0/api/command/createBooleanOption"
description: "Creates a positional argument parser for command subjects."
---

# createArgument

Creates a positional argument parser to use in command `subjects`.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createArgument/main.ts-->
```

## Syntax

```typescript
function createArgument<
  GenericName extends string,
  GenericSpec extends EligibleSpec
>(
  name: GenericName,
  spec: GenericSpec,
  params?: {
    description?: string
    optional?: false
  }
): Argument<GenericName, EligibleSpecOutput<GenericSpec>>

function createArgument<
  GenericName extends string,
  GenericSpec extends EligibleSpec
>(
  name: GenericName,
  spec: GenericSpec,
  params?: {
    description?: string
    optional: boolean
  }
): Argument<GenericName, EligibleSpecOutput<GenericSpec> | undefined>
```

## Parameters

- `name` (`string`) : argument key exposed in `args`.
- `spec` (`EligibleSpec`) : parser/clean spec used to parse and validate the received positional value.
- `params` (optional) : argument metadata.
- `params.description` (`string`, optional) : help description.
- `params.optional` (`boolean`, default `false`) : allows the argument to be omitted.

## Return value

- `Argument` : argument definition to place inside `subjects` in [`create`](/en/v0/api/command/create) or [`exec`](/en/v0/api/command/exec).

## Notes

- Positional arguments are consumed in declaration order.
- In execute handlers, parsed values are available as `args.<name>`.
- Use only `EligibleSpec` values (primitive-like specs, literals, unions, pipes/transforms, file, clean specs).

## See also

- [`create`](/en/v0/api/command/create) - Builds a command node using `subjects`.
- [`exec`](/en/v0/api/command/exec) - Runs a root command from process arguments.
