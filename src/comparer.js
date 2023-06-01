import _ from 'lodash';

const Comparer = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  return sortedKeys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (_.isObject(val1) && _.isObject(val2)) {
        return { name: key, status: 'nested', children: Comparer(val1, val2) };
      }
      if (val1 === val2) {
        return { name: key, status: 'unchanged', value: val1 };
      }
      return {
        name: key, status: 'changed', oldValue: val1, newValue: val2,
      };
    }
    if (Object.hasOwn(obj1, key)) {
      return { name: key, status: 'removed', oldValue: val1 };
    }
    return { name: key, status: 'added', newValue: val2 };
  });
};

export default Comparer;
