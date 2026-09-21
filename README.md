# IT 207 AI-Assisted Programming Workshop

This project contains three small Node.js command-line programs based on the Module 2 material:

- `myGrep.js` prints lines containing a search string.
- `myHead.js` prints the first N lines of a file.
- `findFirst.js` combines the two ideas by searching **only the first N lines** and printing matching lines from that section.

## Running the programs

Install [Node.js](https://nodejs.org/en/download), download or clone this repository, and open a terminal in its folder. No npm packages are needed.

```sh
node myGrep.js ERROR server.log
node myHead.js server.log 5
node findFirst.js ERROR server.log 5
```

The argument order is:

```text
node myGrep.js <pattern> <filename>
node myHead.js <filename> [numberOfLines]
node findFirst.js <pattern> <filename> [numberOfLines]
```

Square brackets mean the argument is optional; do not type the brackets. The default line limit is 10. Quote a search phrase or filename if it contains spaces.

```sh
node myGrep.js "config missing" server.log
node findFirst.js ERROR server.log
```

## What FindFirst does

FindFirst reads a UTF-8 text file, splits it into lines, and checks each line up to the requested limit. It prints a line when that line contains the search text.

For example, the included `server.log` has ERROR messages on lines 2, 6, and 11. This command:

```sh
node findFirst.js ERROR server.log 5
```

prints:

```text
ERROR config missing
```

The other ERROR messages are outside the first five lines. Omitting the limit checks the first ten lines and prints:

```text
ERROR config missing
ERROR request failed
```

The workshop's intended behavior is to limit the **lines inspected**, not to search the entire file until a certain number of matches has been collected.

## Module 2 concepts used

- `require('fs')` and `fs.readFileSync(filename, 'utf8')` read the file synchronously.
- `process.argv` supplies the command-line inputs.
- `Number()` converts the optional line limit from a string to a number.
- Arrays, loops, string methods, and `if` statements control which lines are printed.
- `try`/`catch` handles file-reading errors.

## Behavior and limitations

- Matching is case-sensitive and uses literal text. These simplified programs do not implement all Linux command options or regular-expression matching.
- A missing line limit defaults to 10. Zero prints no lines. Negative, fractional, nonnumeric, empty, or unsafe numeric limits produce an error.
- A limit larger than the file stops at the end of the available lines.
- Empty files produce no output. Real blank lines still count toward N.
- LF and Windows CRLF line endings are supported. A final line without a newline is included. Printed lines end with a newline.
- An empty search string matches every inspected line.
- Missing arguments and unreadable files produce an error and exit status 1. Successful processing exits with status 0, including when there are no matches. This differs from the full Linux grep command's no-match exit status.
- Each program loads the whole file into memory, following the synchronous file-reading approach from Module 2. Limiting the search does not avoid that initial read, so this approach is intended for small text files.

## Testing

The programs were tested with Node.js v24.21.0 on Windows x64. **All 55 automated checks passed.** See [TEST-RESULTS.md](TEST-RESULTS.md) for the expected and actual outputs.

The checks cover the first-N-lines requirement, the default limit, zero and oversized limits, missing files, invalid arguments, empty files, blank lines, CRLF line endings, case sensitivity, and files without a final newline.

## AI assistance

OpenAI Codex helped review and assist with verifying the code's validity and checks.
