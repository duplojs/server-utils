Minimum file size.

When this property is omitted, there is no minimum size check.
When it is present, the file is valid only if its size is greater than or equal to this value.

A number is read as bytes.
A string is converted with the same units as `stringToBytes`: `b`, `kb`, `mb`, `gb`, `tb`, and `pb`.
String units use base 1024.
Decimal string values are rounded down to bytes.
