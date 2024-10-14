import { homedir, platform } from 'node:os';

export const FILE_TYPES = {
  file: 'file',
  dir: 'directory',
  sym: 'symbolic link',
  block: 'block device',
  character: 'character device',
  fifo: 'FIFO',
  socket: 'socket',
  unknown: 'unknown',
};

export const FILE_PRIORITY = {
  [FILE_TYPES.dir]: 1,
  [FILE_TYPES.file]: 2,
  [FILE_TYPES.sym]: 3,
  [FILE_TYPES.block]: 4,
  [FILE_TYPES.character]: 5,
  [FILE_TYPES.fifo]: 6,
  [FILE_TYPES.socket]: 7,
  [FILE_TYPES.unknown]: 8,
};

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
  notFile: 'Not a file',
  invalidArgumentCount: 'Invalid number of arguments',
  optionNotExists: 'Option does not exist',
  commandNotFound: 'Command not found',
  unablAccess: 'Unable to access',
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

export const OS_OPTIONS = {
  eol: '--EOL',
  homedir: '--homedir',
  username: '--username',
  architecture: '--architecture',
  cpus: '--cpus',
};
