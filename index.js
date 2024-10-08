import { getUsername, goodbyeUser, welcomeUser } from './src/utils.js';
import { setPrompt } from './src/promt.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { operation } from './src/operation.js';
import { COMMAND_ARGUMENTS_REGEX, HOME } from './src/constants.js';
const rl = readline.createInterface({ input, output });

const main = async () => {
  let currentDir = HOME;
  const currentUser = getUsername();

  welcomeUser(currentUser);
  setPrompt(rl, currentDir);

  rl.on('line', async (answer) => {
    const args = [];
    let match;
    while ((match = COMMAND_ARGUMENTS_REGEX.exec(answer)) !== null) {
      args.push(match[1] ? match[1] : match[0]);
    }
    const [command, ...rest] = args;
    currentDir = await operation(rl, currentDir, command, rest);
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
