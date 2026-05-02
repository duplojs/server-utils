---
description: "Overview of @duplojs/server-utils, its goals, and its feature families."
next:
  text: "Getting Started"
  link: "/en/v0/guide/quickStart"
---

# Introduction

`@duplojs/server-utils` gathers the system-level building blocks that keep coming back in server projects: file access, environment variables, process arguments, CLI commands, and integration with `@duplojs/utils` parsers.

The library has a simple goal: make infrastructure code readable, typed, and portable without reimplementing the same helpers in every project.

## Role

`@duplojs/server-utils` acts as a cross-cutting toolbox in the DuploJS ecosystem:

- centralize common system operations behind consistent APIs
- return explicit results, often as `Either`, so errors can be handled deliberately;
- connect external inputs to `DataParser` schemas to validate and type system data;
- keep the same usage style across Node, Bun, and Deno.

## What The Library Covers

The `file` namespace provides filesystem operations: read, write, copy, move, inspect, create temporary resources, and manipulate file/folder interfaces.

The `common` namespace contains runtime helpers: process arguments, current working directory, process exit, and especially `environmentVariable`, which loads environment files, expands references between variables, validates the final object with a schema, and avoids relying on a blind `.env` loader.

The `command` namespace lets you build complete CLIs: typed options, positional subjects, subcommands, generated help, and readable parsing errors.

The `dataParser` namespace adds server-oriented parsers, such as the file parser, to connect `@duplojs/utils` validation with objects exposed by `@duplojs/server-utils`.
