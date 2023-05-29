import _ from 'lodash';

const showValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value)) ? `'${value}'` : value;
};

const plain = (data, path = []) => {
  const lines = data.flatMap(({
    key, val, oldVal, operation, nodeType,
  }) => {
    let result;
    const keyStr = [...path, key].join('.');
    const valStr = showValue(val);
    if (operation === 'update') {
      const oldValStr = showValue(oldVal);
      result = `Property '${keyStr}' was updated. From ${oldValStr} to ${valStr}`;
    } else if (operation === 'add') {
      result = `Property '${keyStr}' was added with value: ${valStr}`;
    } else if (operation === 'delete') {
      result = `Property '${keyStr}' was removed`;
    } else if (operation === 'nochange') {
      result = (nodeType === 'branch') ? plain(val, [...path, key]) : [];
    }
    return result;
  });
  return lines.join('\n');
};

export default plain;
