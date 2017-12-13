const Plugin = require('../Plugin')
const ioredis = require('ioredis')
const MSG = require('./MSG')

function Redis () {
}

Redis.prototype = new Plugin()

Redis.prototype.createPool = function (profile) {

}

Redis.prototype.removeProfile = function (uid) {
  let profiles = this.store.get('profiles')
  if (uid === undefined || uid.length <= 0) {
    return
  }
  profiles = profiles.filter(function (item) {
    if (item.uid === uid) {
      return false
    }
    return true
  })
  this.store.set('profiles', profiles)
}

Redis.prototype.loadProfile = function () {
  let profiles = this.store.get('profiles')
  if (!profiles) {
    return []
  }
  return profiles
}

Redis.prototype.init = function () {

}

module.exports = Redis
