import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file3.json');

test('genDiff flat obj', () => {
  const result1 = readFile('expected_12.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(result1);
  const result2 = readFile('expected_13.txt');
  expect(genDiff(filepath1, filepath3)).toEqual(result2);
  const result3 = readFile('expected_31.txt');
  expect(genDiff(filepath3, filepath1)).toEqual(result3);
  const result4 = readFile('expected_33.txt');
  expect(genDiff(filepath3, filepath3)).toEqual(result4);
});
