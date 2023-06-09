import { extname } from 'path';
import { readFileSync } from 'node:fs';
import comparer from './comparer.js';
import parser from './parser.js';
import formatter from './formatters/index.js';

const readAndParseFile = (filepath) => {
  const data = readFileSync(filepath);
  const format = (extname(filepath)).substring(1);
  return parser(data, format);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = readAndParseFile(filepath1);
  const obj2 = readAndParseFile(filepath2);

  const data = comparer(obj1, obj2);
  const output = formatter(data, formatName);
  return output;
};

export default genDiff;
