import { readFile, writeFile } from 'node:fs/promises';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error('Usage: node repair_manual_json.mjs <input> <output>');
}

let source = await readFile(inputPath, 'utf8');

// The supplied export contains omitted commas between adjacent JSON values.
// These replacements only add separators where a completed object/array is
// immediately followed by another named property or chapter object.
let previous;
do {
  previous = source;
  source = source
    .replace(/}\s*}\s*]\s*(?="[^"]+"\s*:)/g, '},')
    .replace(/}\s*(?="[^"]+"\s*:)/g, '},')
    .replace(/]\s*(?="[^"]+"\s*:)/g, '],')
    .replace(/}\s*(?=\{\s*"chapter"\s*:)/g, '},')
    .replace(/]\s*(?=\{\s*"chapter"\s*:)/g, '],')
    .replace(/}\s*\.\s*(?=[,}\]])/g, '}');
} while (source !== previous);

let parsed;
try {
  parsed = JSON.parse(source);
} catch (error) {
  await writeFile(`${outputPath}.failed`, source, 'utf8');
  const position = Number(error.message.match(/position (\d+)/)?.[1] || 0);
  throw new Error(`The source still has a structural error after safe repair: ${error.message}\n${source.slice(Math.max(0, position - 160), position + 160)}`);
}

await writeFile(outputPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
console.log(`Repaired ${Array.isArray(parsed) ? parsed.length : 1} top-level item(s).`);
