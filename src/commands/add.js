import fs from 'node:fs/promises';
import { showError } from '../utils.js';
import path from 'node:path';
import { ERRORS } from '../constants.js';

/**
/**
 * Creates a new file with the specified name in the current directory.
 * If the file already exists, an error will be thrown and the file will not be overwritten.
 *
 * @param {string} currentDir - The current directory where the file will be created.
 * @param {string[]} options - An array of options, expected to contain only the file name.
 * @returns {Promise<string>} Returns the current directory after the operation is completed.
 * @throws {Error} Will throw an error if the file already exists.
 */
export const add = async (currentDir, options) => {
  if (options.length !== 1) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  const [fileName] = options;
  try {
    const filePath = path.resolve(currentDir, fileName);
    const fileHandle = await fs.open(filePath, 'wx');
    await fileHandle.writeFile('');
    await fileHandle.close();
  } catch (err) {
    showError(ERRORS.failed);
    showError(`${err}`);
  }
  return currentDir;
};
