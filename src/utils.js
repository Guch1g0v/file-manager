import { EOL, cpus as osCpus, userInfo } from 'node:os';
import { colors, ERRORS, FILE_PRIORITY, FILE_TYPES, OS_OPTIONS } from './constants.js';
import fs from 'fs/promises';
import { readdir } from 'node:fs/promises';
import { HOME } from './constants.js';

/**
 * @return {String}
 */
export const getUsername = () => {
  const defaultName = 'Anonymous';
  if (process.env?.npm_config_username) {
    return process.env.npm_config_username;
  }
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  if (usernameArg) {
    const [_, username] = usernameArg.split('=');
    return username.trim() || defaultName;
  }
  return defaultName;
};

/**
 * @param {String} username
 */
export const welcomeUser = (username) => {
  console.log(`${colors.cyan}Welcome to the File Manager, ${username}!`, colors.reset);
};

/**
 * @param {String} username
 */
export const goodbyeUser = (username) => {
  console.log(
    `${EOL}${colors.cyan}Thank you for using File Manager, ${username}, goodbye!`,
    colors.reset,
  );
};

/**
 * @param {String} text
 */
export const showError = (text) => {
  console.error(text);
};

/**
 *
 * @param {String} dirPath
 */
export const getStats = async (dirPath) => {
  try {
    return await fs.stat(dirPath);
  } catch {}
};

/**
 * Determines the type of a file.
 *
 * @param {fs.Dirent} file - The file or directory entry.
 * @returns {string} - The type of the file (directory, file, symbolic link, etc.).
 */
export const getFileType = (file) => {
  if (file.isDirectory()) return FILE_TYPES.dir;
  if (file.isFile()) return FILE_TYPES.file;
  if (file.isSymbolicLink()) return FILE_TYPES.sym;
  if (file.isBlockDevice()) return FILE_TYPES.block;
  if (file.isCharacterDevice()) return FILE_TYPES.character;
  if (file.isFIFO()) return FILE_TYPES.fifo;
  if (file.isSocket()) return FILE_TYPES.socket;
  return FILE_TYPES.unknown;
};

const truncateText = (text) => {
  const terminalWidth = process.stdout.columns || 80;
  const maxLength = Math.min(terminalWidth - 40, 200);
  if (text.length <= maxLength) {
    return text;
  }
  const halfLength = Math.floor((maxLength - 3) / 2);
  return text.slice(0, halfLength) + '...' + text.slice(-halfLength);
};

/**
 *
 * @param {String} dirPath
 */
export const printFilesTable = async (dirPath) => {
  console.log(dirPath);
  const result = [];
  const files = await readdir(dirPath, { withFileTypes: true });
  for (const file of files) {
    const fileName = truncateText(file.name);
    const type = getFileType(file);
    result.push({ Name: fileName, Type: type });
  }
  result.sort((a, b) => {
    const priorityA = FILE_PRIORITY[a.Type] || FILE_PRIORITY[FILE_TYPES.unknown];
    const priorityB = FILE_PRIORITY[b.Type] || FILE_PRIORITY[FILE_TYPES.unknown];
    return priorityA - priorityB;
  });

  if (result.length !== 0) {
    console.table(result);
  }
};

/**
 * Prints various system information based on the provided options.
 * Supported options:
 * - '--EOL': Prints the end-of-line marker for the current OS.
 * - '--homedir': Prints the home directory of the current user.
 * - '--username': Prints the username of the current system user.
 * - '--architecture': Prints the CPU architecture of the Node.js binary.
 * - '--cpus': Prints detailed information about each CPU core, including the model and clock rate.
 *
 * @param {string[]} options - An array of options that determine what system information to print.
 * Each option corresponds to a specific system property.
 */
export const printOsOptions = (options) => {
  for (const option of options) {
    if (option === OS_OPTIONS.eol) {
      console.log(JSON.stringify(EOL));
    }
    if (option === OS_OPTIONS.homedir) {
      console.log(HOME);
    }
    if (option === OS_OPTIONS.username) {
      console.log(userInfo().username);
    }

    if (option === OS_OPTIONS.architecture) {
      console.log(process.arch);
    }

    if (option === OS_OPTIONS.cpus) {
      const cpus = osCpus();
      const result = cpus.map((cpu) => {
        return {
          Model: truncateText(cpu.model),
          ClockRate: `${(cpu.speed / 1000).toFixed(2)} GHz`,
        };
      });
      result.push({
        Total: cpus.length,
      });
      console.table(result);
    }
  }
};

/**
 * Checks if a file at the specified file path is accessible and is a valid file.
 * Throws an error if the file does not exist or is not a regular file.
 *
 * @param {string} filePath - The path of the file to check for accessibility.
 * @returns {Promise<void>} Resolves if the file is accessible and is a valid file.
 * @throws {Error} If the file is not accessible or if the path does not point to a regular file.
 */
export const checkFileAccessible = async (filePath) => {
  const stats = await getStats(filePath);
  if (!stats) {
    throw new Error(`${ERRORS.unablAccess} [${filePath}]`);
  }
  if (!stats.isFile()) {
    throw new Error(`${ERRORS.notFile} [${filePath}]`);
  }
};

/**
 * Checks if a directory at the specified path is accessible and is a valid directory.
 * Throws an error if the directory does not exist or the path is not a directory.
 *
 * @param {string} dirPath - The path of the directory to check for accessibility.
 * @returns {Promise<void>} Resolves if the directory is accessible and is a valid directory.
 * @throws {Error} If the directory is not accessible or if the path does not point to a valid directory.
 */

export const checkDirAccessible = async (dirPath) => {
  const stats = await getStats(dirPath);
  if (!stats) {
    throw new Error(`${ERRORS.unablAccess} [${dirPath}]`);
  }
  if (!stats.isDirectory()) {
    throw new Error(`${ERRORS.notDirectory} [${dirPath}]`);
  }
};
