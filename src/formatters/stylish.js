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
  const iter = (tree, depth) => tree.map((node) => {
    switch (node.status) {
      case 'nested':
        return `${getIndent(depth)}  ${node.name}: {\n${iter(node.children, depth + 1).join('')}${getIndent(depth)}  }\n`;
      case 'changed':
        return `${getIndent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n`
        + `${getIndent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`;
      case 'added':
        return `${getIndent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`;
      case 'removed':
        return `${getIndent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n`;
      default:
        return `${getIndent(depth)}  ${node.name}: ${stringify(node.value, depth)}\n`;
    }
  });
  return `{\n${iter(data, 1).join('')}}`;
};

export default stylish;
