import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (node, path) => {
    const filterTree = node.filter((child) => child.status !== 'unchanged');
    const lines = filterTree.map((child) => {
      switch (child.status) {
        case 'nested':
          return iter(child.children, `${path}${child.name}.`);
        case 'changed':
          return `Property '${path}${child.name}' was updated. From ${getValue(child.oldValue, path)} to ${getValue(child.newValue, path)}`;
        case 'added':
          return `Property '${path}${child.name}' was added with value: ${getValue(child.newValue, path)}`;
        case 'removed':
          return `Property '${path}${child.name}' was removed`;
        default:
          return 'error';
      }
    });
    return [...lines].join('\n');
  };
  return iter(data, '');
};

export default plain;
