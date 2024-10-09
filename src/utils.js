import { EOL } from 'os';
import { colors } from './constants.js';

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
