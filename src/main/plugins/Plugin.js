function Plugin (name) {
  this.name = name
}

Plugin.prototype.init = function () {
  throw new Error('SubClass should overwrite this method.')
}

Plugin.prototype.start = function () {
  this.init()
}

module.exports = Plugin
