const Config = require('./redis/Config')

let PLUGINS = []
PLUGINS.push(new Config())

function Plugins () {
}

Plugins.start = function () {
  PLUGINS.forEach(function (plugin) {
    plugin.start()
  })
}

module.exports = Plugins
