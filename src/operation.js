import { COMMANDS } from './commands/commands.js';
import { ERRORS } from './constants.js';
import { showError } from './utils.js';

/**
 * Executes a given command from the available set of commands.
 *
 * This function checks if the provided `command` exists in the `COMMANDS` object.
 * If the command is invalid, an error message is shown, and the current directory remains unchanged.
 * If the command is valid, the corresponding function is executed with the current directory
 * and any additional arguments.
 * The `exit` command closes the readline interface.
 * @param {import('readline').Interface} rl
 * @param {String} currentDir
 * @param {String} command
 * @param {String[]} options
 * @returns {String}
 */
export const operation = async (rl, currentDir, command, options) => {
  if (!command) {
    return currentDir;
  }
  const isCommandExists = command in COMMANDS || command === COMMANDS.exit.cmd;
  if (!isCommandExists) {
    showError(ERRORS.invalidInput);
    return currentDir;
  }
  if (command === COMMANDS.exit.cmd) {
    rl.close();
    return currentDir;
  }
  return await COMMANDS[command].do(currentDir, options);
};
