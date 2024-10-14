import { ERRORS } from '../constants.js';
import { COMMANDS } from './commands.js';
import { printOsOptions, showError } from '../utils.js';

/**
 * Executes OS-related commands based on the provided options and prints the corresponding system information.
 * Valid options include commands like '--EOL', '--homedir', '--username', '--architecture', and '--cpus',
 * which are passed in as an array of strings.
 *
 * @param {string} currentDir - The current working directory. This is returned as is after the execution.
 * @param {string[]} options - An array of options that specify which system information to print. Each option
 * corresponds to a specific command that retrieves system data.
 *
 * @returns {string} Returns the current working directory after executing the specified commands.
 */
export const os = (currentDir, options) => {
  if (options.length < 1) {
    showError(`${ERRORS.invalidInput}: ${ERRORS.invalidArgumentCount}`);
    return currentDir;
  }
  const areBadOptions = options.some((option) => {
    const isOptionExist = COMMANDS.os.options.includes(option);
    if (!isOptionExist) {
      showError(`${ERRORS.invalidInput}: ${ERRORS.optionNotExists} [${option}]`);
    }
    return !isOptionExist;
  });

  if (areBadOptions) {
    return currentDir;
  }
  try {
    printOsOptions(options);
  } catch (error) {
    showError(ERRORS.failed);
    showError(`${error}`);
  }

  return currentDir;
};
