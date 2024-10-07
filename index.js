import { getUsername, goodbyeUser, welcomeUser } from './src/utils.js';
import { setPrompt } from './src/promt.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
const rl = readline.createInterface({ input, output });

const main = async () => {
  const currentUser = getUsername();
  const directories = [os.homedir()];
  welcomeUser(currentUser);
  setPrompt(rl, directories[0]);

  rl.on('line', (answer) => {
    const command = answer.trim().toLowerCase();
    if (command === '.exit') {
      rl.close();
    } else {
      console.log(`echo: ${command}`);
    }
    setPrompt(rl, directories[0]);
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
