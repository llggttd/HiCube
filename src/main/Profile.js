const uuid = require('uuid')

const REG_URL_VALID = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,5}$/
const REG_URL_SELECT = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{2,5})$/

function Profile (description, server) {
  this.uid = uuid()
  this.description = description
  this.setServer(server)
}

Profile.isValidDescription = function (description) {
  if (description === undefined || description === null || typeof description !== 'string' || description.length <= 0) {
    return false
  }
  return true
}

Profile.isValidUrl = function (url) {
  if (url === undefined || url === null || typeof url !== 'string' || url.length <= 0) {
    return false
  }
  return url.replace(' ', '').split(',').every(function (item) {
    return new RegExp(REG_URL_VALID).test(item)
  })
}

Profile.prototype.parseUrl = function (url) {
  if (url === undefined || url === null || typeof url !== 'string' || url.length <= 0) {
    return []
  }
  if (!Profile.isValidUrl(url)) {
    return []
  }
  return url.replace(' ', '').split(',').map(function (item) {
    let matcher = item.match(REG_URL_SELECT)
    return {
      host: matcher[1],
      port: matcher[2]
    }
  })
}

Profile.prototype.setServer = function (server) {
  if (!Array.isArray(server)) {
    this.server = []
  } else {
    this.server = server
  }
  this.isCluster = this.server.length > 1
}

module.exports = Profile
