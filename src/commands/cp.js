import { ERRORS } from '../constants.js';
import { showError } from '../utils.js';
import { innerCp } from './helpers/innerCp.js';

/**
 * Copies a file from the source path to the destination directory using streams.
 *
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - An array containing two strings:
 * the source file path and the destination directory path.
 * @returns {Promise<string>} Returns the current directory after the copy operation is completed.
 */
export const cp = async (currentDir, options) => {
  if (options.length !== 2) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  try {
    await innerCp(currentDir, options);
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
  } finally {
    return currentDir;
  }
};
