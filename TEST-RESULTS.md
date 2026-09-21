# Verification results

Result: **55/55 checks passed.**

Runtime: Node.js v24.21.0, win32/x64.

Run timestamp (UTC): 2026-09-21T03:11:50.695Z.

The verification script invokes each program as a separate command-line process and compares its output and exit status with independently specified expected values. Temporary fixtures cover empty files, CRLF line endings, blank lines, filenames with spaces, and a missing final newline.

Most important check: `node findFirst.js ERROR server.log 5` must output only `ERROR config missing`. The ERROR lines at positions 6 and 11 must be excluded.

Output below uses JSON escapes: `\n` represents a newline. Successful runs have empty stderr. Error checks compare exit status 1 and the listed error fragment.

| Check | Expected stdout | Actual stdout | Expected / actual exit | Required stderr fragment | Result |
|---|---|---|---|---|---|
| FindFirst searches only the first 5 lines | `"ERROR config missing\n"` | `"ERROR config missing\n"` | 0 / 0 | none | PASS |
| FindFirst defaults to 10 lines | `"ERROR config missing\nERROR request failed\n"` | `"ERROR config missing\nERROR request failed\n"` | 0 / 0 | none | PASS |
| FindFirst searches all 12 requested lines | `"ERROR config missing\nERROR request failed\nERROR late failure\n"` | `"ERROR config missing\nERROR request failed\nERROR late failure\n"` | 0 / 0 | none | PASS |
| Match exactly on the limit is included | `"ERROR config missing\n"` | `"ERROR config missing\n"` | 0 / 0 | none | PASS |
| Match after the limit is excluded | `""` | `""` | 0 / 0 | none | PASS |
| FindFirst zero limit prints nothing | `""` | `""` | 0 / 0 | none | PASS |
| FindFirst large limit stops at end of file | `"ERROR config missing\nERROR request failed\nERROR late failure\n"` | `"ERROR config missing\nERROR request failed\nERROR late failure\n"` | 0 / 0 | none | PASS |
| FindFirst no matching text | `""` | `""` | 0 / 0 | none | PASS |
| FindFirst matching is case-sensitive | `""` | `""` | 0 / 0 | none | PASS |
| FindFirst empty pattern matches every inspected line | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\n"` | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\n"` | 0 / 0 | none | PASS |
| FindFirst missing arguments | `""` | `""` | 1 / 1 | Usage: | PASS |
| FindFirst extra arguments | `""` | `""` | 1 / 1 | Usage: | PASS |
| FindFirst rejects limit "-1" | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| FindFirst rejects limit "2.5" | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| FindFirst rejects limit "abc" | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| FindFirst rejects limit "" | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| FindFirst rejects limit " " | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| FindFirst rejects limit "Infinity" | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| FindFirst rejects limit "9007199254740992" | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| FindFirst missing file | `""` | `""` | 1 / 1 | ENOENT | PASS |
| FindFirst directory instead of file | `""` | `""` | 1 / 1 | cannot read | PASS |
| FindFirst empty file | `""` | `""` | 0 / 0 | none | PASS |
| FindFirst handles CRLF | `"ERROR one\n"` | `"ERROR one\n"` | 0 / 0 | none | PASS |
| FindFirst preserves an unterminated final line | `"ERROR last\n"` | `"ERROR last\n"` | 0 / 0 | none | PASS |
| FindFirst counts blank lines toward the limit | `"ERROR first\n"` | `"ERROR first\n"` | 0 / 0 | none | PASS |
| FindFirst accepts a quoted filename with spaces | `"ERROR spaced filename\n"` | `"ERROR spaced filename\n"` | 0 / 0 | none | PASS |
| Head prints first 5 lines | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\n"` | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\n"` | 0 / 0 | none | PASS |
| Head defaults to first 10 lines | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\nERROR request failed\nINFO accepted request\nDEBUG cache check\nINFO completed request\nINFO cleanup\n"` | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\nERROR request failed\nINFO accepted request\nDEBUG cache check\nINFO completed request\nINFO cleanup\n"` | 0 / 0 | none | PASS |
| Head large limit prints available lines | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\nERROR request failed\nINFO accepted request\nDEBUG cache check\nINFO completed request\nINFO cleanup\nERROR late failure\nINFO shutdown\n"` | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\nERROR request failed\nINFO accepted request\nDEBUG cache check\nINFO completed request\nINFO cleanup\nERROR late failure\nINFO shutdown\n"` | 0 / 0 | none | PASS |
| Head zero limit prints nothing | `""` | `""` | 0 / 0 | none | PASS |
| Head empty file produces no extra blank line | `""` | `""` | 0 / 0 | none | PASS |
| Head preserves real blank lines | `"\nERROR first\n\n"` | `"\nERROR first\n\n"` | 0 / 0 | none | PASS |
| Head preserves a single blank line | `"\n"` | `"\n"` | 0 / 0 | none | PASS |
| Head handles CRLF | `"INFO start\nERROR one\n"` | `"INFO start\nERROR one\n"` | 0 / 0 | none | PASS |
| Head preserves unterminated final line | `"INFO start\nERROR last\n"` | `"INFO start\nERROR last\n"` | 0 / 0 | none | PASS |
| Head rejects a negative limit | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| Head rejects a fractional limit | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| Head rejects a nonnumeric limit | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| Head rejects an empty limit | `""` | `""` | 1 / 1 | non-negative whole number | PASS |
| Head missing arguments | `""` | `""` | 1 / 1 | Usage: | PASS |
| Head extra arguments | `""` | `""` | 1 / 1 | Usage: | PASS |
| Head missing file | `""` | `""` | 1 / 1 | ENOENT | PASS |
| Grep prints matches from the entire file | `"ERROR config missing\nERROR request failed\nERROR late failure\n"` | `"ERROR config missing\nERROR request failed\nERROR late failure\n"` | 0 / 0 | none | PASS |
| Grep returns full matching lines | `"ERROR config missing\n"` | `"ERROR config missing\n"` | 0 / 0 | none | PASS |
| Grep is case-sensitive | `""` | `""` | 0 / 0 | none | PASS |
| Grep treats patterns as literal text | `""` | `""` | 0 / 0 | none | PASS |
| Grep supports a search phrase with spaces | `"ERROR config missing\n"` | `"ERROR config missing\n"` | 0 / 0 | none | PASS |
| Grep empty pattern matches all real lines | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\nERROR request failed\nINFO accepted request\nDEBUG cache check\nINFO completed request\nINFO cleanup\nERROR late failure\nINFO shutdown\n"` | `"INFO startup\nERROR config missing\nINFO loading modules\nWARN retrying\nINFO ready\nERROR request failed\nINFO accepted request\nDEBUG cache check\nINFO completed request\nINFO cleanup\nERROR late failure\nINFO shutdown\n"` | 0 / 0 | none | PASS |
| Grep empty file produces no extra blank line | `""` | `""` | 0 / 0 | none | PASS |
| Grep preserves real blank lines | `"\nERROR first\n\nERROR second\n"` | `"\nERROR first\n\nERROR second\n"` | 0 / 0 | none | PASS |
| Grep handles CRLF | `"ERROR one\n"` | `"ERROR one\n"` | 0 / 0 | none | PASS |
| Grep preserves unterminated final line | `"ERROR last\n"` | `"ERROR last\n"` | 0 / 0 | none | PASS |
| Grep missing arguments | `""` | `""` | 1 / 1 | Usage: | PASS |
| Grep extra arguments | `""` | `""` | 1 / 1 | Usage: | PASS |
| Grep missing file | `""` | `""` | 1 / 1 | ENOENT | PASS |

## Example commands

```sh
node myGrep.js ERROR server.log
node myHead.js server.log 5
node findFirst.js ERROR server.log 5
node findFirst.js ERROR server.log
node findFirst.js ERROR server.log 50
node findFirst.js ERROR server.log 0
node findFirst.js ERROR server.log -1
node findFirst.js ERROR does-not-exist.txt
```
