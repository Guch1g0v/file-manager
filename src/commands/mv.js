import { cp } from './cp.js';
import { rm } from './rm.js';

/**
 * Moves a file from source to destination by first copying it and then removing the original.
 *
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - An array containing source and destination file paths.
 * The first element is the source file, and the second element is the destination.
 * @returns {Promise<string>} Returns the current directory after the move operation is completed.
 */
export const mv = async (currentDir, options) => {
  await cp(currentDir, options);
  await rm(currentDir, options.slice(0, 1));
  return currentDir;
};
