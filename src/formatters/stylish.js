import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const massVal = Object.entries(value);
  const lines = massVal.map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${getIndent(depth)}  }`].join('\n');
};

const stylish = (data) => {
  const iter = (tree, depth) => tree.map(({
    status, children, name, value, oldValue, newValue,
  }) => {
    switch (status) {
      case 'nested':
        return `${getIndent(depth)}  ${name}: {\n${iter(children, depth + 1).join('')}${getIndent(depth)}  }\n`;
      case 'changed':
        return `${getIndent(depth)}- ${name}: ${stringify(oldValue, depth)}\n`
        + `${getIndent(depth)}+ ${name}: ${stringify(newValue, depth)}\n`;
      case 'added':
        return `${getIndent(depth)}+ ${name}: ${stringify(newValue, depth)}\n`;
      case 'removed':
        return `${getIndent(depth)}- ${name}: ${stringify(oldValue, depth)}\n`;
      default:
        return `${getIndent(depth)}  ${name}: ${stringify(value, depth)}\n`;
    }
  });
  return `{\n${iter(data, 1).join('')}}`;
};

export default stylish;
