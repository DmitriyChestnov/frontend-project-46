import _ from 'lodash';

const getAllKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return keys;
};

const comparer = (tree1, tree2) => {
  const keys = getAllKeys(tree1, tree2);
  let diffs = [];
  keys.forEach((key) => {
    const val1 = _.get(tree1, key);
    const val2 = _.get(tree2, key);
    let diff;
    if (_.has(tree1, key) && _.has(tree2, key)) {
      if (typeof val1 === 'object' && typeof val2 === 'object') {
        diff = { nodeType: 'branch', operation: 'nochange', val: comparer(val1, val2) };
      } else {
        if (val1 === val2) {
          diff = { operation: 'nochange', val: val1 };
        } else if (typeof val1 === 'object' && val1 !== null) {
          diff = { operation: 'update', val: val2, oldVal: comparer(val1, val1) };
        } else if (typeof val2 === 'object' && val2 !== null) {
          diff = { operation: 'update', val: comparer(val2, val2), oldVal: val1 };
        } else {
          diff = { operation: 'update', val: val2, oldVal: val1 };
        }
        diff.nodeType = 'leaf';
      }
    } else if (_.has(tree1, key)) {
      if (typeof val1 === 'object') {
        diff = { nodeType: 'branch', operation: 'delete', val: comparer(val1, val1) };
      } else {
        diff = { nodeType: 'leaf', operation: 'delete', val: val1 };
      }
    } else if (_.has(tree2, key)) {
      if (typeof val2 === 'object') {
        diff = { nodeType: 'branch', operation: 'add', val: comparer(val2, val2) };
      } else {
        diff = { nodeType: 'leaf', operation: 'add', val: val2 };
      }
    }
    diff.key = key;
    diffs = [...diffs, diff];
    return diffs;
  });
  return diffs;
};

export default comparer;
