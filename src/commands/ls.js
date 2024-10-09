import { readdir } from 'node:fs/promises';
import { ERRORS } from '../constants.js';
import { EOL } from 'node:os';

const fileType = 'file';
const dirType = 'directory';

export const ls = async (currentDir) => {
  const result = [];

  try {
    const files = await readdir(currentDir, { withFileTypes: true });
    for (const file of files) {
      result.push({ Name: file.name, Type: file.isDirectory() ? dirType : fileType });
    }
    result.sort((a, b) => {
      if (a.Type === dirType && b.Type !== dirType) {
        return -1;
      }
      return 1;
    });
    if (result.length !== 0) {
      console.table(result);
    }
    process.stdout.write(EOL);
  } catch {
    console.error(ERRORS.failed);
  }
  return currentDir;
};
