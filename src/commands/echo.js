export const echo = (currentDir, rest) => {
  console.log(rest.join(' '));
  return currentDir;
};
