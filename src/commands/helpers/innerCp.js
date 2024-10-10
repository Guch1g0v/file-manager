import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { checkDirAccessible, checkFileAccessible } from '../../utils.js';

/**
 * Copies a file from the source path to the destination directory using streams.
 *
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - An array containing two strings:
 *  the source file path (src) and the destination directory path (dest).
 * @returns {Promise<void>} Resolves when the copy operation is completed.
 * @throws Will throw an error if the copy operation fails.
 */
export const innerCp = async (currentDir, options) => {
  try {
    const [src, dest] = options;
    const fileSrc = path.resolve(currentDir, src);
    const fileDestDir = path.resolve(currentDir, dest);

    await checkFileAccessible(fileSrc);
    await checkDirAccessible(fileDestDir);

    const fileName = path.basename(fileSrc);
    const fileDest = path.join(fileDestDir, fileName);

    const readableStream = createReadStream(fileSrc);
    const writableStream = createWriteStream(fileDest);

    await pipeline(readableStream, writableStream);
  } catch (error) {
    throw error;
  }
};
