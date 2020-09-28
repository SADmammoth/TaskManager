export default function compareObjects(leftObject, rightObject) {
  if ((!leftObject && rightObject) || (!rightObject && leftObject)) {
    return false;
  }
  if (leftObject === rightObject) {
    return true;
  }
  Object.keys(leftObject).sort();
  Object.keys(rightObject).sort();
  return JSON.stringify(leftObject) === JSON.stringify(rightObject);
}
