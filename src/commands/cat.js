import { createReadStream } from 'node:fs';
import { ERRORS } from '../constants.js';
import { checkFileAccessible, showError } from '../utils.js';
import path from 'node:path';
import { EOL } from 'node:os';

/**
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - An array of strings
 * @returns {string}
 */
export const cat = async (currentDir, options) => {
  if (options.length !== 1) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  const [pathToFile] = options;
  const filePath = path.resolve(currentDir, pathToFile);
  try {
    await checkFileAccessible(filePath);
    const readableStream = createReadStream(filePath);
    return new Promise((resolve) => {
      readableStream.on('data', (data) => {
        process.stdout.write(`${data}${EOL}`, 'utf8');
      });
      readableStream.on('error', (err) => {
        showError(ERRORS.failed);
        showError(`${err}`);
        resolve(currentDir);
      });
      readableStream.on('end', () => {
        resolve(currentDir);
      });
    });
  } catch (err) {
    showError(ERRORS.failed);
    showError(`${err}`);
    return currentDir;
  }
};
