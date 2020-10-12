function retrieveFields(object, keys) {
  let result = {};

  keys.forEach((key) => {
    if (object[key]) {
      result[key] = object[key];
    }
  });

  return result;
}

export default retrieveFields;
