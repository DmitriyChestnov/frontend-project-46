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
const filepath4 = getFixturePath('file4.yml');
const filepath5 = getFixturePath('file5.yaml');

test('genDiff nested obj json', () => {
  const result1 = readFile('expected_12.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(result1);
  const result2 = readFile('expected_33.txt');
  expect(genDiff(filepath3, filepath3)).toEqual(result2);
});

test('genDiff nested obj yml', () => {
  const result = readFile('expected_12.txt');
  expect(genDiff(filepath4, filepath5)).toEqual(result);
});

test('Should throw an error', () => {
  const filePathText1 = getFixturePath('expected_12.txt');
  const filePathText2 = getFixturePath('expected_33.txt');
  expect(() => {
    genDiff(filePathText1, filePathText2);
  }).toThrow('invalid file format');
});
