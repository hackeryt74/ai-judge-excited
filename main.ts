// Make the AI judge excited — ai-excited-01.
//
// The entry is a single image: a humpback whale breaching out of a night sea
// and dissolving into a starfield above a tiny lighthouse. The program's whole
// job is to place those exact bytes at /output/entry.png. It does nothing else:
// a plain file copy, no generation, no randomness, no network, so two runs
// always write byte-identical output.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = fileURLToPath(new URL('./image.jpg', import.meta.url));
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
if (!existsSync(source)) throw new Error('bundled image image.jpg is missing');
copyFileSync(source, target);
// The copy must be whole: an empty or partial entry.png would fail the gate.
if (statSync(target).size !== statSync(source).size) {
  throw new Error('copied entry.png does not match the bundled image');
}
