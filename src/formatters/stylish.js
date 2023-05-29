const stylish = (data, depth = 0) => {
  if (data === undefined || data === null || typeof data !== 'object') {
    return String(data);
  }
  const replacer = ' ';
  const spacesCount = 4;
  const currentDepth = depth + 1;
  const prefix = replacer.repeat(spacesCount * (depth + 1) - 2);
  const bracePrefix = replacer.repeat(spacesCount * depth);

  const lines = data.flatMap(({
    key, val, oldVal, operation,
  }) => {
    let result = [];
    const valStr = stylish(val, currentDepth);
    if (operation === 'update') {
      const oldValStr = stylish(oldVal, currentDepth);
      result = [
        `${prefix}- ${key}: ${oldValStr}`,
        `${prefix}+ ${key}: ${valStr}`,
      ];
    } else if (operation === 'add') {
      result = `${prefix}+ ${key}: ${valStr}`;
    } else if (operation === 'delete') {
      result = `${prefix}- ${key}: ${valStr}`;
    } else if (operation === 'nochange') {
      result = `${prefix}  ${key}: ${valStr}`;
    }
    return result;
  });
  return ['{', ...lines, `${bracePrefix}}`].join('\n');
};

const formatDiff = (data, formatter = 'stylish') => {
  let format;
  if (formatter === 'stylish') {
    format = stylish;
  }
  return format(data);
};

export default formatDiff;
