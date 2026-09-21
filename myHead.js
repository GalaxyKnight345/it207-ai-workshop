const fs = require('fs');
const args = process.argv.slice(2);

if (args.length < 1 || args.length > 2) {
  console.error('Usage: node myHead.js <filename> [numberOfLines]');
  process.exit(1);
}

const filename = args[0];
const limit = args.length === 2 ? Number(args[1]) : 10;

if ((args.length === 2 && args[1].trim() === '') ||
    !Number.isSafeInteger(limit) || limit < 0) {
  console.error('Error: numberOfLines must be a non-negative whole number.');
  process.exit(1);
}

try {
  const text = fs.readFileSync(filename, 'utf8');
  const lines = text === '' ? [] : text.split('\n');

  if (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }

  for (let i = 0; i < limit && i < lines.length; i++) {
    let line = lines[i];
    if (line.endsWith('\r')) {
      line = line.slice(0, -1);
    }
    console.log(line);
  }
} catch (error) {
  console.error('Error: cannot read "' + filename + '" (' + error.code + ').');
  process.exit(1);
}
