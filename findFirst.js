const fs = require('fs');
const args = process.argv.slice(2);

if (args.length < 2 || args.length > 3) {
  console.error('Usage: node findFirst.js <pattern> <filename> [numberOfLines]');
  process.exit(1);
}

const pattern = args[0];
const filename = args[1];
const limit = args.length === 3 ? Number(args[2]) : 10;

if ((args.length === 3 && args[2].trim() === '') ||
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
    if (line.includes(pattern)) {
      console.log(line);
    }
  }
} catch (error) {
  console.error('Error: cannot read "' + filename + '" (' + error.code + ').');
  process.exit(1);
}
