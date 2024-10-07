import os from 'os';

const promptSymbol = os.platform() === 'win32' ? '>' : '$';
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

export const setPrompt = (rl, currentDir) => {
  console.log(`You are currently in ${currentDir}${os.EOL}`);
  const promptText = `${new Date().toLocaleTimeString()} [${currentDir}]`;
  rl.setPrompt(`${colors.green}${promptText}${os.EOL}${promptSymbol} ${colors.reset}`);
  rl.prompt();
};
