import { EOL } from 'os';
import { colors } from './promt.js';

export const getUsername = () => {
  const defaultName = 'Anonymous';
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  if (usernameArg) {
    const [_, username] = usernameArg.split('=');
    return username.trim() || defaultName;
  }
  return defaultName;
};

export const welcomeUser = (username) => {
  console.log(`${colors.red}Welcome to the File Manager, ${username}!`, colors.reset);
};

export const goodbyeUser = (username) => {
  console.log(
    `${EOL}${colors.red}Thank you for using File Manager, ${username}, goodbye!`,
    colors.reset,
  );
};
