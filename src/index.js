import { extname } from 'path';
import { readFileSync } from 'node:fs';
import comparer from './comparer.js';
import parser from './parser.js';
import stylish from './formatters/stylish.js';

const readAndParseFile = (filepath) => {
  const data = readFileSync(filepath);
  const format = extname(filepath);
  return parser(data, format);
};

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = readAndParseFile(filepath1);
  const obj2 = readAndParseFile(filepath2);

  const data = comparer(obj1, obj2);
  const output = stylish(data, format);
  return output;
};

export default genDiff;
