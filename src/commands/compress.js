import { handleCompression } from './helpers/handleCompression.js';
/**
 * Compress the file
 * @param {string} currentDir
 * @param {string[]} options
 * @returns {string}
 */
export const compress = (currentDir, options) => handleCompression(currentDir, options, true);
