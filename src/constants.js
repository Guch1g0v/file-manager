import { homedir } from 'node:os';

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
};

export const HOME = homedir();

/**
 * Regular expression to split the input into commands and arguments.
 *
 * This regex matches either:
 * - A sequence of characters that are not spaces or quotation marks: `[^\s"]+`
 * - Text inside quotation marks (without including the quotes): `"([^"]*)"`
 *
 * It is useful for parsing input commands where arguments may be quoted strings.
 *
 * @type {RegExp}
 */
export const COMMAND_ARGUMENTS_REGEX = /[^\s"]+|"([^"]*)"/g;
