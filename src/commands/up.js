import path from 'node:path';
import fs from 'node:fs/promises';
import { ERRORS } from '../constants.js';
import { showError } from '../utils.js';

/**
 * Moves up one directory level from the current directory.
 *
 * This function moves the current directory up by one level in the directory structure.
 * It checks if the current directory can be moved up, and if the resulting path is valid and a directory.
 * If any options are passed, it returns an error as this command does not accept options.
 *
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - Array of options, which should be empty for this command.
 * @returns {Promise<string>} - The parent directory if successful, or the current directory if an error occurs.
 */
export const up = async (currentDir, options) => {
  if (options.length > 0) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  const dir = path.parse(currentDir).dir;
  try {
    const stats = await fs.stat(dir);
    if (stats.isDirectory()) {
      return dir;
    }
    return currentDir;
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
    return currentDir;
  }
};
