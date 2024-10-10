import { rename as fsRename } from 'fs/promises';
import { showError } from '../utils.js';
import { ERRORS } from '../constants.js';
import path from 'path';
/**
 * Renames a file from the old name to the new name.
 *
 * @param {string} currentDir - The current directory where the file is located.
 * @param {string[]} options - An array containing the old file name and the new file name.
 * @returns {Promise<string>} Returns the current directory after the rename operation is completed.
 */

export const rn = async (currentDir, options) => {
  if (options.length !== 2) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  const [oldFileName, newFileName] = options;
  try {
    const oldPath = path.resolve(currentDir, oldFileName);
    const newPath = path.resolve(currentDir, newFileName);
    await fsRename(oldPath, newPath);
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
  }
  return currentDir;
};
