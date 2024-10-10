import { EOL, cpus as osCpus, userInfo } from 'node:os';
import { colors, DIR_TYPE, FILE_TYPE, OS_OPTIONS } from './constants.js';
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

const truncateText = (text, maxLength) => {
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
  const terminalWidth = process.stdout.columns || 80;
  const maxFileNameLength = Math.min(terminalWidth - 40, 200);
  const result = [];
  const files = await readdir(dirPath, { withFileTypes: true });
  for (const file of files) {
    const fileName = truncateText(file.name, maxFileNameLength);
    const type = file.isDirectory() ? DIR_TYPE : FILE_TYPE;
    result.push({ Name: fileName, Type: type });
  }
  result.sort((a, b) => {
    if (a.Type === DIR_TYPE && b.Type !== DIR_TYPE) {
      return -1;
    }
    return 1;
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
          Model: cpu.model,
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
