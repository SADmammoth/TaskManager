import React from 'react';

function App() {
 const contentful = require('contentful');
 const client = contentful.createClient({
  space: 'p0flk5r1ro43',
  accessToken: 'n30_7BCShxauK7NzRhfIrHyGfNCRkVpwxvptLIrh4VI'
 });

 client
  .getEntry('1k8EWItCOXusywJLAlZSpn') //entry ID
  .then(entry => console.log(entry))
  .catch(err => console.log(err));
 return <h1>React and Contentfull sample</h1>;
}

export default App;
