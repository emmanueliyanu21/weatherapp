const { WorkboxPluginGenerate } = require('workbox-webpack-plugin');

module.exports = {

  plugins: [
    new WorkboxPluginGenerate({
      ...require('./workbox-config.js'), 
      cleanupOutdatedCaches: true,
    }),
  ],
};
