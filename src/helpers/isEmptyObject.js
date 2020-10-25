module.exports = function isEmptyObject(object) {
  return !object || !Object.keys(object).length;
};
