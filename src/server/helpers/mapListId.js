module.exports = function mapListId(root, listRequestId) {
  return root.children[parseInt(listRequestId)];
};
