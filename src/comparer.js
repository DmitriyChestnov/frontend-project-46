import _ from 'lodash';

const comparer = (data1, data2) => {
  
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
 
  const keys = _.union(keys1, keys2).sort();

  const compare = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (data1[key] !== data2[key]) {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    } else {
      acc[`  ${key}`] = data1[key];
    }
    return acc;
  }, {});

  return compare;
};

export default comparer;
