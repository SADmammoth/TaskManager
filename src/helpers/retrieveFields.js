function retrieveFields(object, keys) {
  let result = {};
  keys.forEach((el) => (object[el] ? (result[el] = object[el]) : false));
  return result;
}

export default retrieveFields;
