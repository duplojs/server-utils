---
description: "Install @duplojs/server-utils and make a first use in a few minutes."
prev:
  text: "Introduction"
  link: "/en/v0/guide/"
---

# Quick Start

## Install dependencies
::: code-group
```bash [npm]
npm install @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [yarn]
yarn add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [pnpm]
pnpm add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [bun]
bun add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [deno]
deno add npm:@duplojs/server-utils@0 npm:@duplojs/utils@1
```
:::

## Quick usage

```ts
import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.readTextFile("/tmp/example.txt");

if (E.isRight(result)) {
	const content = result.right;
	// content: string
}
```