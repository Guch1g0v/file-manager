import { getUsername, goodbyeUser, welcomeUser } from './src/utils.js';
import { setPrompt } from './src/promt.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { operation } from './src/operation.js';
import { COMMAND_ARGUMENTS_REGEX, DirState, HOME } from './src/constants.js';
import { EOL } from 'node:os';

const rl = readline.createInterface({ input, output });

const main = async () => {
  let currentDir = HOME;
  DirState.PWD = HOME;
  const currentUser = getUsername();
  welcomeUser(currentUser);
  setPrompt(rl, currentDir);

  rl.on('line', async (answer) => {
    const args = [];
    let match;
    while ((match = COMMAND_ARGUMENTS_REGEX.exec(answer)) !== null) {
      if (match[1]) {
        args.push(match[1]);
      } else if (match[2]) {
        args.push(match[2]);
      } else {
        args.push(match[0]);
      }
    }
    const [command, ...options] = args;
    currentDir = await operation(rl, currentDir, command, options);
    process.stdout.write(EOL);
    setPrompt(rl, currentDir);
  });

  process.on('SIGINT', () => {
    rl.close();
  });

  rl.on('close', () => {
    goodbyeUser(currentUser);
    process.exit(0);
  });
};

main();
