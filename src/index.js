import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App.js';
import * as serviceWorker from './server/controllers/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
