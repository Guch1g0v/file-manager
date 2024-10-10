import { ERRORS, FILE_TYPE } from '../constants.js';
import { getStats, printFilesTable, showError } from '../utils.js';
import path from 'node:path';

/**
 * Lists the contents of the specified directory and prints a formatted table.
 *
 * @param {String} currentDir - The path of the directory to list the contents of.
 * @param {String[]} options
 * @returns {Promise<string>} - Returns the current directory path after listing contents.
 */
export const ls = async (currentDir, options) => {
  if (options.length === 0) {
    try {
      await printFilesTable(currentDir);
    } catch (error) {
      showError(`${ERRORS.failed}`);
      showError(`${error}`);
    }
    return currentDir;
  }
  for (const option of options) {
    let dirPath = currentDir;
    try {
      dirPath = path.resolve(currentDir, option);
      const fileStats = await getStats(dirPath);
      if (!fileStats) {
        throw new Error(`${ERRORS.unablAccess} ${dirPath}`);
      }
      if (fileStats.isFile()) {
        const fileName = path.basename(dirPath);
        console.table([{ Name: fileName, Type: FILE_TYPE }]);
        continue;
      }
      await printFilesTable(dirPath);
    } catch (error) {
      showError(`${ERRORS.failed}`);
      showError(`${error}`);
    }
  }
  return currentDir;
};
