import { ERRORS } from '../constants.js';
import { showError } from '../utils.js';
import path from 'node:path';
import { rm as fsRm } from 'fs/promises';

/**
 * Removes the specified file from the current directory.
 *
 * @param {string} currentDir - The current directory where the file is located.
 * @param {string[]} options - An array of options, expected to contain only the file name to be removed.
 * @returns {Promise<string>} Returns the current directory after the operation is completed.
 */
export const rm = async (currentDir, options) => {
  if (options.length !== 1) {
    showError(ERRORS.invalidInput);
    return currentDir;
  }
  const [fileName] = options;
  try {
    const filePath = path.resolve(currentDir, fileName);
    await fsRm(filePath);
  } catch {
    showError(ERRORS.failed);
  }
  return currentDir;
};
