import { readdir } from 'node:fs/promises';
import { ERRORS } from '../constants.js';
import { EOL } from 'node:os';

const fileType = 'file';
const dirType = 'directory';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  const halfLength = Math.floor((maxLength - 3) / 2);
  return text.slice(0, halfLength) + '...' + text.slice(-halfLength);
};

const terminalWidth = process.stdout.columns || 80;
const maxFileNameLength = Math.min(terminalWidth - 40, 200);

/**
 * Lists the contents of the specified directory and prints a formatted table.
 *
 * @param {string} currentDir - The path of the directory to list the contents of.
 * @returns {Promise<string>} - Returns the current directory path after listing contents.
 */
export const ls = async (currentDir) => {
  const result = [];

  try {
    const files = await readdir(currentDir, { withFileTypes: true });
    for (const file of files) {
      const fileName = truncateText(file.name, maxFileNameLength);
      const type = file.isDirectory() ? dirType : fileType;
      result.push({ Name: fileName, Type: type });
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
