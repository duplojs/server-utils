---
description: "Understand the command system and create a typed CLI with @duplojs/server-utils."
prev:
  text: "Getting Started"
  link: "/en/v0/guide/quickStart"
next:
  text: "Command Reference"
  link: "/en/v0/api/command/"
---

# Create A Command

The `command` feature helps you write CLIs that are simple to call and solid to maintain. You describe what the command accepts, the library reads process arguments, validates inputs, generates help, and calls your handler with already typed values.

## Principle

A command is made of three parts:

- options, such as `--port 3000` or `--verbose`;
- a subject, meaning the positional arguments after options;
- a handler, called only when parsing succeeds.

Options and subjects rely on `DataParser` from `@duplojs/utils`. This turns CLI input, which always starts as text, into typed domain values.

## A First Command

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/firstCommand.ts-->
```

Here, `exec` creates the root command. The `DP.tuple([DP.string(), DP.string()])` subject requires two positional arguments: the searched pattern and the file to inspect.

<TerminalBlock title="grep-like">
<span class="terminal-line terminal-info">$ grep-like "TODO" ./src/index.ts --ignore-case</span>
search "TODO" in ./src/index.ts (case-insensitive)
</TerminalBlock>

## Add Options

`createBooleanOption` creates a flag. It is `true` when the option is present and `false` otherwise.

`createOption` parses a single value. With `required: true`, the handler always receives a value.

`createArrayOption` parses a list of values and can enforce a minimum, a maximum, or a custom separator.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/options.ts-->
```

The type of `options.type` becomes `"file" | "directory"`. If the received value does not match the parser, the command does not call the handler.

## Understand Errors

When parsing fails, `exec` prints an interpreted error and exits with code `1`. The error shows the command, the failing option or subject, the received value, and what was expected.

<TerminalBlock title="find-like">
<span class="terminal-line terminal-info">$ find-like --type socket</span>
<span class="terminal-line"></span>
<span class="terminal-line terminal-error">Command failed</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">COMMAND:</span> root</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">OPTION:</span> --type</span>
<span class="terminal-line"><span class="terminal-error">✖</span> expected <span class="terminal-value">file | directory</span> but received <span class="terminal-error">"socket"</span></span>
</TerminalBlock>


This is useful for internal tools: you can keep strict contracts without writing diagnostic messages yourself.

## Subcommands

For a CLI with several actions, create commands with `SC.create`, then pass them as the subject of a parent command.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/subCommands.ts-->
```

<TerminalBlock title="apt-like">
<span class="terminal-line terminal-info">$ apt-like install typescript --yes</span>
install typescript without prompt
</TerminalBlock>

Each subcommand can have its own description, options, subject, and handler. Help follows the command tree.

## Generated Help

`--help` and `-h` are automatically available. The output is built from declared descriptions, aliases, options, and subjects.

<TerminalBlock title="apt-like">
<span class="terminal-line terminal-info">$ apt-like --help</span>
<span class="terminal-line"></span>
<span class="terminal-line"><span class="terminal-key">NAME:</span>root</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">DESCRIPTION:</span></span>
<span class="terminal-line terminal-indent-1">Package manager</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">NAME:</span>install</span>
<span class="terminal-line terminal-indent-2"><span class="terminal-key">DESCRIPTION:</span></span>
<span class="terminal-line terminal-indent-2">Install a package</span>
<span class="terminal-line terminal-indent-2"><span class="terminal-key">OPTIONS:</span></span>
<span class="terminal-line terminal-indent-2">- <span class="terminal-info">yes:</span> -y, --yes</span>
<span class="terminal-line terminal-indent-3">Answer yes to prompts</span>
<span class="terminal-line terminal-indent-2"><span class="terminal-key">SUBJECT:</span>&lt;string&gt;</span>
</TerminalBlock>

This makes command and option descriptions important: they become the embedded documentation of your tool.

## Lightweight Version With execOptions

When your script has no subcommands and no positional subject, `execOptions` is enough. It only parses process options and returns a typed object.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/execOptions.ts-->
```

<TerminalBlock title="server-script">
<span class="terminal-line terminal-info">$ server-script --port 3000 --reload</span>
server listens on 3000 with reload
</TerminalBlock>

Use `execOptions` for minimal scripts. Move to `exec` as soon as you have positional arguments, subcommands, or a real CLI experience to expose.
