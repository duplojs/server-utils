---
outline: [2, 3]
prev:
  text: "execOptions"
  link: "/en/v0/api/command/execOptions"
next:
  text: "createArgument"
  link: "/en/v0/api/command/createArgument"
description: "Creates a CLI command with a name, optional options/subjects, and an execute handler."
---

# create

`create` declares a CLI command.
You provide a name and an execute function, and you can also add options, positional arguments, or child commands.

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
  GenericSubjects extends Subjects
>(
  name: string,
  params: CreateCommandParams<GenericOptions, GenericSubjects>,
  execute: (
    params: CreateCommandExecuteParams<GenericOptions, GenericSubjects>
  ) => MaybePromise<void>
): Command
```

## Parameters

- `name` (`string`) : command name used for matching and help rendering.
- `params` (`CreateCommandParams`, optional) : command configuration.
- `params.description` (`string`, optional) : help description.
- `params.options` (`Option[]`, optional) : option parsers.
- `params.subjects` (`Argument[] | Command[]`, optional) : either a list of positional arguments built with [`createArgument`](/en/v0/api/command/createArgument), or a list of child commands.
- `execute` : command handler. Receives typed `options` and, when positional arguments are declared, typed `args`.

## Return value

- `Command` : command definition object meant to be attached to a command tree and executed through [`exec`](/en/v0/api/command/exec).

## Others examples

### Advanced

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/create/advanced.ts-->
```

## See also

- [`exec`](/en/v0/api/command/exec) - Runs a root command from process arguments.
- [`createArgument`](/en/v0/api/command/createArgument) - Builds a positional argument used in `subjects`.
- [`createOption`](/en/v0/api/command/createOption) - Builds a single-value option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
