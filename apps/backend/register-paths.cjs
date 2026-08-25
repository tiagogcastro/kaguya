const path = require('path');
const { register } = require('tsconfig-paths');

register({
  baseUrl: path.resolve(__dirname, 'build'),
  paths: {
    '@/*': ['*'],
  },
});
