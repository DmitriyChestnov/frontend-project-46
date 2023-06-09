import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : String(value);
};

const plain = (data) => {
  const iter = (node, path) => {
    const filterTree = node.filter((child) => child.status !== 'unchanged');
    const lines = filterTree.map(({
      status, children, name, oldValue, newValue,
    }) => {
      switch (status) {
        case 'nested':
          return iter(children, `${path}${name}.`);
        case 'changed':
          return `Property '${path}${name}' was updated. From ${getValue(oldValue, path)} to ${getValue(newValue, path)}`;
        case 'added':
          return `Property '${path}${name}' was added with value: ${getValue(newValue, path)}`;
        case 'removed':
          return `Property '${path}${name}' was removed`;
        default:
          return 'error';
      }
    });
    return [...lines].join('\n');
  };
  return iter(data, '');
};

export default plain;
