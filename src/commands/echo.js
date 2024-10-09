/**
 * Prints the provided options as a concatenated string and returns the current directory.
 * @param {string} currentDir - The current working directory.
 * @param {string[]} options - An array of strings to be concatenated and printed.
 * @returns {string}
 */
export const echo = (currentDir, options) => {
  console.log(options.join(' '));
  return currentDir;
};
