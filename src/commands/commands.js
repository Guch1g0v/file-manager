import { cat } from './cat.js';
import { cd } from './cd.js';
import { echo } from './echo.js';
import { ls } from './ls.js';
import { up } from './up.js';

const clear = (currentDir) => {
  return currentDir;
};

const add = (currentDir) => {
  return currentDir;
};
const rn = (currentDir) => {
  return currentDir;
};
const cp = (currentDir) => {
  return currentDir;
};
const mv = (currentDir) => {
  return currentDir;
};
const rm = (currentDir) => {
  return currentDir;
};
const os = (currentDir) => {
  return currentDir;
};
const hash = (currentDir) => {
  return currentDir;
};
const compress = (currentDir) => {
  return currentDir;
};
const decompress = (currentDir) => {
  return currentDir;
};

/**
 * @typedef {Object} Command
 * @property {string} cmd - Command name
 * @property {Array<string>} options - Command options
 * @property {Function} do - Function that executes the command
 */

/**
 * List of available commands with their options and execution functions.
 * @type {Object<string, Command>}
 */

export const COMMANDS = {
  clear: { cmd: 'clear', options: [], do: clear },
  echo: { cmd: 'echo', options: [], do: echo },
  cd: { cmd: 'cd', options: [], do: cd },
  ls: { cmd: 'ls', options: [], do: ls },
  up: { cmd: 'up', options: [], do: up },
  exit: { cmd: '.exit', options: [] },
  cat: { cmd: 'cat', options: [], do: cat },
  add: { cmd: 'add', options: [], do: add },
  rn: { cmd: 'rn', options: [], do: rn },
  cp: { cmd: 'cp', options: [], do: cp },
  mv: { cmd: 'mv', options: [], do: mv },
  rm: { cmd: 'rm', options: [], do: rm },
  os: { cmd: 'os', options: ['EOL', 'cpus', 'homedir', 'username', 'architecture'], do: os },
  hash: { cmd: 'hash', options: [], do: hash },
  compress: { cmd: 'compress', options: [], do: compress },
  decompress: { cmd: 'decompress', options: [], do: decompress },
};
