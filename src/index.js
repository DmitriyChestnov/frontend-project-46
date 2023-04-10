import { extname } from 'path';
import { readFileSync } from 'node:fs';
import comparer from './comparer.js';
import parser from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1);
  const data2 = readFileSync(filepath2);
  const format1 = extname(filepath1);
  const format2 = extname(filepath2);

  const obj1 = parser(data1, format1);
  const obj2 = parser(data2, format2);

  return comparer(obj1, obj2);
};

export default genDiff;
