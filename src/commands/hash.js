import { ERRORS } from '../constants.js';
import { checkFileAccessible, showError } from '../utils.js';
import { createReadStream } from 'node:fs';
import { finished } from 'stream/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

/**
 *
 * @param {string} currentDir
 * @param {string[]} options
 * @returns {string}
 */
export const hash = async (currentDir, options) => {
  if (options.length !== 1) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  const [pathToFile] = options;

  const hash = createHash('sha256');
  try {
    const filePath = path.resolve(currentDir, pathToFile);
    await checkFileAccessible(filePath);
    const readableStream = createReadStream(filePath);
    readableStream.on('data', (data) => {
      hash.update(data);
    });
    readableStream.on('error', (err) => {
      throw err;
    });
    await finished(readableStream);
    console.log(hash.digest('hex'));
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
  }
  return currentDir;
};
