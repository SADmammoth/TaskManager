# REACT AND CONTENFUL TEST APP

Webpack, React, Contentful

    "@babel/core": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
    "@babel/preset-react": "^7.6.3",
    "css-loader": "^2.1.1",
    "eslint": "^5.16.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-loader": "^2.1.2",
    "eslint-plugin-react": "^7.16.0",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.4.1"

    "dev": "webpack-dev-server --mode development --watch --no-inline",
    "build": "node run sass && webpack -p",
    "lint": "eslint src/",
    "scss": "node-sass -w src/scss -o src/css",
    "start": "node server.js"

Ready to deploy on heroku
