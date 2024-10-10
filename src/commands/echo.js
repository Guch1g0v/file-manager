import { ERRORS } from '../constants.js';
import { showError } from '../utils.js';

/**
 * Prints the provided options as a concatenated string and returns the current directory.
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - An array of strings to be concatenated and printed.
 * @returns {string}
 */
export const echo = (currentDir, options) => {
  try {
    console.log(options.join(' '));
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
  }

  return currentDir;
};
