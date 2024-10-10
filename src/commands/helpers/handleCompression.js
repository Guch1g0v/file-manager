import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip, createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { ERRORS } from '../../constants.js';
import { checkDirAccessible, checkFileAccessible, showError } from '../../utils.js';
/**
 *
 * @param {string} currentDir
 * @param {string[]} options
 * @param {boolean} isCompress
 * @returns {string}
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
