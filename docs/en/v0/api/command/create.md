---
outline: [2, 3]
prev:
  text: "exec"
  link: "/en/v0/api/command/exec"
next:
  text: "createBooleanOption"
  link: "/en/v0/api/command/createBooleanOption"
description: "Creates a command node with optional options, subject parser, and sub-commands."
---

# create

Creates a command node with optional options, subject parser, and sub-commands.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/create/main.ts-->
```

## Syntax

```typescript
function create(
  name: string,
  execute: () => void
): Command

function create<
  GenericOptions extends readonly Option[],
  GenericSubject extends Subject
>(
  name: string,
  params: CreateCommandParams<GenericOptions, GenericSubject>,
  execute: (
    params: CreateCommandExecuteParams<GenericOptions, GenericSubject>
  ) => MaybePromise<void>
): Command
```

## Parameters

- `name` (`string`) : command name used for matching and help rendering.
- `params` (`CreateCommandParams`, optional) : command configuration.
- `params.description` (`string`, optional) : help description.
- `params.options` (`Option[]`, optional) : option parsers.
- `params.subject` (`Subject | Command[]`, optional) : parser for positional data or sub-commands list.
- `execute` : command handler. Receives typed `options` and optional typed `subject`.

## Return value

- `Command` : executable command object with `execute(args)`.

## See also

- [`exec`](/en/v0/api/command/exec) - Runs a root command from process arguments.
- [`createOption`](/en/v0/api/command/createOption) - Builds a single-value option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
