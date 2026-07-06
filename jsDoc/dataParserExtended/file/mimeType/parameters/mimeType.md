MIME type pattern used by the checker.

A `RegExp` is used as-is.
A string is escaped and converted to an exact match.
A tuple of strings is escaped and converted to an exact match for one of the values.

The tested MIME type comes from `FileInterface.getMimeType()`.
It is inferred from the file extension.
The file content is not inspected.
