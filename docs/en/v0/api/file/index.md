---
outline: [2, 3]
description: "File system utilities to read, write, and inspect paths."
prev:
  text: "Common"
  link: "/en/v0/api/common/"
next:
  text: "API Reference"
  link: "/en/v0/api/"
---

# File

File system utilities to read, write, and inspect paths.

## How to import?

The library exposes the `DServerFile` and `SF` namespaces from the main entry **or** via direct import (tree-shaking friendly), which lets you load only what you need.

```typescript
import { DServerFile, SF } from "@duplojs/server-utils";
import * as DServerFile from "@duplojs/server-utils/file";
import * as SF from "@duplojs/server-utils/file";
```

## Read

### [`readFile`](/en/v0/api/file/readFile)
reads a file and returns its binary content.

### [`readTextFile`](/en/v0/api/file/readTextFile)
reads a text file and returns its content.

## Write

### [`writeFile`](/en/v0/api/file/writeFile)
writes binary content to a file.

### [`writeTextFile`](/en/v0/api/file/writeTextFile)
writes text content to a file.

## Append

### [`appendFile`](/en/v0/api/file/appendFile)
appends binary content to the end of a file.

### [`appendTextFile`](/en/v0/api/file/appendTextFile)
appends text content to the end of a file.

## JSON

### [`readJsonFile`](/en/v0/api/file/readJsonFile)
reads and parses a JSON file.

### [`writeJsonFile`](/en/v0/api/file/writeJsonFile)
serializes and writes a JSON file.

## Directories

### [`readDirectory`](/en/v0/api/file/readDirectory)
lists the entries in a directory.

### [`makeDirectory`](/en/v0/api/file/makeDirectory)
creates a directory.

### [`ensureDirectory`](/en/v0/api/file/ensureDirectory)
ensures a directory exists.

### [`walkDirectory`](/en/v0/api/file/walkDirectory)
walks a directory recursively.

## Links

### [`symlink`](/en/v0/api/file/symlink)
creates a symbolic link.

### [`readLink`](/en/v0/api/file/readLink)
reads the target of a symbolic link.

### [`link`](/en/v0/api/file/link)
creates a hard link.

### [`linkStat`](/en/v0/api/file/linkStat)
retrieves information about a symbolic link.

## Paths and metadata

### [`exists`](/en/v0/api/file/exists)
checks that a path exists.

### [`stat`](/en/v0/api/file/stat)
retrieves information about a path.

### [`realPath`](/en/v0/api/file/realPath)
resolves a path to its canonical form.

## Move and copy

### [`remove`](/en/v0/api/file/remove)
removes a file or directory.

### [`copy`](/en/v0/api/file/copy)
copies a file or directory.

### [`move`](/en/v0/api/file/move)
moves a file or directory.

### [`rename`](/en/v0/api/file/rename)
renames a file or directory within its parent directory.

### [`truncate`](/en/v0/api/file/truncate)
truncates a file to a given size.

## Permissions and timestamps

### [`setMode`](/en/v0/api/file/setMode)
sets permissions for a file or directory.

### [`setOwner`](/en/v0/api/file/setOwner)
sets the owner of a file or directory.

### [`setTime`](/en/v0/api/file/setTime)
updates access and modification timestamps.

## Temporary files and helpers

### [`makeTemporaryDirectory`](/en/v0/api/file/makeTemporaryDirectory)
creates a temporary directory.

### [`makeTemporaryFile`](/en/v0/api/file/makeTemporaryFile)
creates a temporary file.

### [`ensureFile`](/en/v0/api/file/ensureFile)
ensures a file exists.

## MIME types

### [`mimeType`](/en/v0/api/file/mimeType)
list of supported MIME types and extensions.

## Interfaces

### [`fileInterface`](/en/v0/api/file/fileInterface)
creates a file interface with utility methods.

### [`folderInterface`](/en/v0/api/file/folderInterface)
creates a directory interface with utility methods.

### [`unknownInterface`](/en/v0/api/file/unknownInterface)
creates an interface for a path of unknown type.
