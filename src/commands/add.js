import fs from 'node:fs/promises';
import { showError } from '../utils.js';
import path from 'node:path';
import { ERRORS } from '../constants.js';

export const add = async (currentDir, options) => {
  if (options.length !== 1) {
    showError(ERRORS.invalidInput);
    return currentDir;
  }
  const [fileName] = options;
  try {
    const filePath = path.resolve(currentDir, fileName);
    await fs.writeFile(filePath, '', 'utf8');
  } catch {
    showError(ERRORS.failed);
  }
  return currentDir;
};
