import { COMMANDS } from './commands/commands.js';
import { ERRORS } from './constants.js';
import { showError } from './utils.js';

/**
 * Executes a given command from the available set of commands and possibly changes the current directory.
 *
 * This function checks if the provided `command` exists in the `COMMANDS` object.
 * If the command is invalid, an error message is shown, and the current directory remains unchanged.
 * If the command is valid, the corresponding function is executed with the current directory
 * and any additional arguments. Depending on the command, it may return a new current directory.
 *
 * @param {string} currentDir - The current working directory before the command is executed.
 * @param {string} command - The command to be executed.
 * @param {string[]} options - An array of additional arguments for the command.
 * @returns {Promise<string>} The new current directory, or the original directory if unchanged.
 */
export const operation = async (currentDir, command, options) => {
  if (!command) {
    return currentDir;
  }
  const isCommandExists = command in COMMANDS;
  if (!isCommandExists) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.commandNotFound} [${command}]`);
    return currentDir;
  }
  return await COMMANDS[command].do(currentDir, options);
};
