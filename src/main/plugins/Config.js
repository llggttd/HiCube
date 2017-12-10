const Plugin = require('../Plugin')
const {app, ipcMain} = require('electron')
const Store = require('electron-store')

function Config () {
  this.store = new Store()
  console.log('app config path : %s', app.getPath('userData'))
}

Config.prototype = new Plugin()

Config.ASYNC_MSG_ADD_PROFILE = 'async_msg_add_profile'
Config.ASYNC_MSG_REMOVE_PROFILE = 'async_msg_remove_profile'
Config.ASYNC_MSG_LOAD_PROFILE = 'async_msg_load_profile'

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
  ipcMain.on(Config.ASYNC_MSG_ADD_PROFILE, (event, arg) => {
    this.addProfile(arg)
    event.sender.send(Config.ASYNC_MSG_ADD_PROFILE, true)
  })
  ipcMain.on(Config.ASYNC_MSG_REMOVE_PROFILE, (event, arg) => {
    this.removeProfile(arg)
    event.sender.send(Config.ASYNC_MSG_REMOVE_PROFILE, true)
  })
  ipcMain.on(Config.ASYNC_MSG_LOAD_PROFILE, (event, arg) => {
    event.sender.send(Config.ASYNC_MSG_LOAD_PROFILE, this.loadProfile())
  })
}

module.exports = Config
