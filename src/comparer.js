import _ from 'lodash';

const parse = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keys = _.union(keys1, keys2).sort();
  let compare = '{';

  keys.forEach((key) => {
    if (!Object.hasOwn(data1, key)) {
      compare += `\n  + ${key}: ${data2[key]}`;
    } else if (!Object.hasOwn(data2, key)) {
      compare += `\n  - ${key}: ${data1[key]}`;
    } else if (data1[key] !== data2[key]) {
      compare += `\n  - ${key}: ${data1[key]}`;
      compare += `\n  + ${key}: ${data2[key]}`;
    } else {
      compare += `\n    ${key}: ${data1[key]}`;
    }
  });

  return `${compare}\n}`;
};

export default parse;
