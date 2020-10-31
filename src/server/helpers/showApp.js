const path = require('path');

exports.showApp = (req, res) => {
  res.sendFile(path.resolve(process.env.BUILD_FOLDER, 'index.html'));
};
