import { createReadStream } from 'node:fs';
import { ERRORS } from '../constants.js';
import { showError } from '../utils.js';
import path from 'node:path';
import { EOL } from 'node:os';

/**
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - An array of strings
 * @returns {string}
 */
export const cat = async (currentDir, options) => {
  if (options.length > 1) {
    showError(ERRORS.invalidInput);
    return currentDir;
  }
  const [pathToFile] = options;
  const file = path.resolve(currentDir, pathToFile);
  const readableStream = createReadStream(file);
  try {
    return new Promise((resolve) => {
      readableStream.on('data', (data) => {
        process.stdout.write(`${data}${EOL}`, 'utf8');
      });
      readableStream.on('error', () => {
        showError(ERRORS.failed);
        resolve(currentDir);
      });
      readableStream.on('end', () => {
        resolve(currentDir);
      });
    });
  } catch {
    showError(ERRORS.failed);
    return currentDir;
  }
};
