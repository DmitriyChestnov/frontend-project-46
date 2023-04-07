import { readFileSync } from 'node:fs';
import comparer from './comparer.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  return comparer(obj1, obj2);
};

export default genDiff;
