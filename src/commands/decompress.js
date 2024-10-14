import { handleCompression } from './helpers/handleCompression.js';
/**
 * Decompress the file
 * @param {string} currentDir
 * @param {string[]} options
 * @returns {string}
 */
export const decompress = (currentDir, options) => handleCompression(currentDir, options, false);
