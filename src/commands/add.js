import fs from 'node:fs/promises';
import { showError } from '../utils.js';
import path from 'node:path';
import { ERRORS } from '../constants.js';

/**
 * Creates a new file with the specified name in the current directory.
 * If the file already exists, it will be overwritten.
 *
 * @param {string} currentDir - The current directory where the file will be created.
 * @param {string[]} options - An array of options, expected to contain only the file name.
 * @returns {Promise<string>} Returns the current directory after the operation is completed.
 */
export const add = async (currentDir, options) => {
  if (options.length !== 1) {
    showError(ERRORS.invalidInput);
    return currentDir;
  }
  const [fileName] = options;
  try {
    const filePath = path.resolve(currentDir, fileName);
    const fileHandle = await fs.open(filePath, 'wx');
    await fileHandle.writeFile('');
    await fileHandle.close();
  } catch {
    showError(ERRORS.failed);
  }
  return currentDir;
};
