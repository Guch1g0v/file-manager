import { homedir, platform } from 'node:os';

export const FILE_TYPE = 'file';
export const DIR_TYPE = 'directory';

export const colors = {
  reset: '\x1b[0m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

export const ERRORS = {
  invalidInput: 'Invalid input',
  failed: 'Operation failed',
  notDirectory: 'Not a directory',
  invalidArgumentCount: 'Invalid number of arguments',
};

export const HOME = homedir();
export const PLATFORM = platform();
export const DirState = {
  PWD: '',
  OLDPWD: '',
};

/**
 * Regular expression to split the input into commands and arguments.
 *
 * This regex matches either:
 * - A sequence of characters that are not spaces, double, or single quotation marks: `[^\s"']+`
 * - Text inside double quotation marks (without including the quotes): `"([^"]*)"`
 * - Text inside single quotation marks (without including the quotes): `'([^']*)'`
 *
 * It is useful for parsing input commands where arguments may be quoted strings using either single or double quotes.
 *
 * @type {RegExp}
 */
export const COMMAND_ARGUMENTS_REGEX = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
