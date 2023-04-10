import yaml from 'js-yaml';

const parse = (file, format) => {
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

export default parse;
