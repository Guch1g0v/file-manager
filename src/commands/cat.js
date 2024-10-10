import { createReadStream } from 'node:fs';
import { ERRORS } from '../constants.js';
import { checkFileAccessible, showError } from '../utils.js';
import path from 'node:path';
import { EOL } from 'node:os';
import { finished } from 'stream/promises';

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
    readableStream.on('data', (data) => {
      process.stdout.write(`${data}${EOL}`, 'utf8');
    });
    readableStream.on('error', (err) => {
      throw err;
    });
    await finished(readableStream);
    return currentDir;
  } catch (err) {
    showError(ERRORS.failed);
    showError(`${err}`);
    return currentDir;
  }
};
