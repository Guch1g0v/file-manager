import { add } from './add.js';
import { cat } from './cat.js';
import { cd } from './cd.js';
import { echo } from './echo.js';
import { ls } from './ls.js';
import { rm } from './rm.js';
import { rn } from './rn.js';
import { up } from './up.js';
import { cp } from './cp.js';
import { mv } from './mv.js';
import { clear } from './clear.js';
import { os } from './os.js';
import { OS_OPTIONS } from '../constants.js';
import { hash } from './hash.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js';

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
  cat: { cmd: 'cat', options: [], do: cat },
  add: { cmd: 'add', options: [], do: add },
  rn: { cmd: 'rn', options: [], do: rn },
  cp: { cmd: 'cp', options: [], do: cp },
  mv: { cmd: 'mv', options: [], do: mv },
  rm: { cmd: 'rm', options: [], do: rm },
  os: {
    cmd: 'os',
    options: [
      OS_OPTIONS.eol,
      OS_OPTIONS.cpus,
      OS_OPTIONS.homedir,
      OS_OPTIONS.username,
      OS_OPTIONS.architecture,
    ],
    do: os,
  },
  hash: { cmd: 'hash', options: [], do: hash },
  compress: { cmd: 'compress', options: [], do: compress },
  decompress: { cmd: 'decompress', options: [], do: decompress },
};
