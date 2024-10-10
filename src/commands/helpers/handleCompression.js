import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip, createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { ERRORS } from '../../constants.js';
import { checkDirAccessible, checkFileAccessible, showError } from '../../utils.js';
/**
 * Handles file compression or decompression based on the provided flag.
 *
 * @async
 * @function
 * @param {string} currentDir - The current working directory from which the paths are resolved.
 * @param {string[]} options - Array of two strings: source file path and destination file path.
 * @param {boolean} isCompress - A flag indicating whether to compress (`true`) or decompress (`false`) the file.
 * @returns {Promise<string>} - Returns the current directory after the operation is completed.
 * @throws {Error} - Throws an error if file accessibility checks fail or if there is an issue during compression/decompression.
 */

export const handleCompression = async (currentDir, options, isCompress) => {
  if (options.length !== 2) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  try {
    const [src, dest] = options;
    const fileSrc = path.resolve(currentDir, src);
    const fileDest = path.resolve(currentDir, dest);
    const dirDest = path.parse(fileDest).dir;

    await checkFileAccessible(fileSrc);
    await checkDirAccessible(dirDest);

    const srcStream = createReadStream(fileSrc);
    const destStream = createWriteStream(fileDest);
    const zipStream = isCompress ? createGzip() : createGunzip();

    await pipeline(srcStream, zipStream, destStream);
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
  }
  return currentDir;
};
