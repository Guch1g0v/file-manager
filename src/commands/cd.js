import path from 'node:path';
import fs from 'node:fs/promises';

import { DirState, ERRORS, HOME, PLATFORM } from '../constants.js';
import { showError } from '../utils.js';

/**
 * Changes the current working directory.
 *
 * This function attempts to change the current directory to the one specified in the `options` array.
 * If no directory is specified, it returns the home directory. If more than one directory is passed, it shows an error.
 * The function checks if the provided path is absolute or relative and adjusts it accordingly.
 * If the target is a valid directory, it returns the new directory path; otherwise, it returns the current directory.
 *
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - Array containing the target directory as the first element.
 * @returns {Promise<string>} - The new directory if successful, or the current directory if the operation fails.
 */
export const cd = async (currentDir, options) => {
  if (options.length > 1) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  if (options.length === 0) {
    DirState.OLDPWD = DirState.PWD;
    DirState.PWD = HOME;
    return HOME;
  }
  let [pathToDirectory] = options;

  if (pathToDirectory === '~') {
    DirState.OLDPWD = DirState.PWD;
    DirState.PWD = HOME;
    return HOME;
  }

  if (pathToDirectory === '-') {
    if (!DirState.OLDPWD) return HOME;
    const t = DirState.OLDPWD;
    DirState.OLDPWD = DirState.PWD;
    DirState.PWD = t;
    return t;
  }

  if (PLATFORM === 'win32' && /^[a-zA-Z]:$/.test(pathToDirectory)) {
    pathToDirectory += '\\';
  }

  let cleanPath = path.isAbsolute(pathToDirectory)
    ? pathToDirectory
    : path.resolve(currentDir, pathToDirectory);

  cleanPath = path.normalize(cleanPath);

  if (PLATFORM === 'win32' && (cleanPath === '/' || cleanPath === '\\')) {
    cleanPath = path.parse(currentDir).root;
  }

  try {
    const stats = await fs.stat(cleanPath);
    if (stats.isDirectory()) {
      DirState.OLDPWD = DirState.PWD;
      DirState.PWD = cleanPath;
      return cleanPath;
    }
    showError(ERRORS.failed);
    showError(ERRORS.notDirectory);
    return currentDir;
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
    return currentDir;
  }
};
