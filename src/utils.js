import { EOL } from 'node:os';
import { colors, DIR_TYPE, FILE_TYPE } from './constants.js';
import fs from 'fs/promises';
import { readdir } from 'node:fs/promises';

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
  process.stdout.write(EOL);
};
