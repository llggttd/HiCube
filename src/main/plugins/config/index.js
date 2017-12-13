const Plugin = require('../Plugin')
const MSG = require('./MSG')
const {app, ipcMain} = require('electron')
const Store = require('electron-store')

function Config () {
  this.store = new Store()
  console.log('app config path : %s', app.getPath('userData'))
}

Config.prototype = new Plugin()

Config.prototype.addProfile = function (profile) {
  let profiles = this.store.get('profiles')
  if (!profiles) {
    profiles = []
  }
  profiles.push(profile)
  this.store.set('profiles', profiles)
}

Config.prototype.removeProfile = function (uid) {
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

Config.prototype.loadProfile = function () {
  let profiles = this.store.get('profiles')
  if (!profiles) {
    return []
  }
  return profiles
}

Config.prototype.init = function () {
  ipcMain.on(MSG.ASYNC_PROFILE_ADD, (event, arg) => {
    this.addProfile(arg)
    event.sender.send(MSG.ASYNC_PROFILE_RELOAD, true)
  })
  ipcMain.on(MSG.ASYNC_PROFILE_REMOVE, (event, arg) => {
    this.removeProfile(arg)
    event.sender.send(MSG.ASYNC_PROFILE_RELOAD, true)
  })
  ipcMain.on(MSG.ASYNC_PROFILE_LOAD, (event, arg) => {
    event.sender.send(MSG.ASYNC_PROFILE_LOAD, this.loadProfile())
  })
}

module.exports = Config
