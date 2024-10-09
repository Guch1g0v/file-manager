import { EOL } from 'node:os';
import { colors, HOME, PLATFORM } from './constants.js';

const promptSymbol = PLATFORM === 'win32' ? '>' : '$';

/**
 * Sets and displays a prompt with the current time and directory.
 *
 * This function sets the prompt text in the `readline` interface to include the current time and the current directory.
 * It also formats the prompt with colors and symbols for better readability in the terminal.
 *
 * @param {import('readline').Interface} rl
 * @param {String} currentDir
 */
export const setPrompt = (rl, currentDir) => {
  if (currentDir !== '/' || PLATFORM === 'win32') {
    currentDir = currentDir.replace(/[\/\\]$/, '');
  }
  console.log(`You are currently in [${currentDir}]`);
  currentDir = currentDir.replace(HOME, '~');
  const promptText = `${new Date().toLocaleTimeString()} [${currentDir}]`;
  rl.setPrompt(`${colors.green}${promptText}${EOL}${promptSymbol} ${colors.reset}`);
  rl.prompt();
};
