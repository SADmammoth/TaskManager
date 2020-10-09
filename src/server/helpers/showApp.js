import path from 'path';

export const showApp = (req, res) => {
  res.sendFile(path.join(__dirname, '../../../dist/index.html'));
};
