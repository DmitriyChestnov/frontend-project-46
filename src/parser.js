import yaml from 'js-yaml';

const parser = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error('invalid file format');
  }
};

export default parser;
