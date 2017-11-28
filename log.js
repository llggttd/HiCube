const moment = require('moment')
const chalk = require('chalk')
const util = require('util')

module.exports = function () {
	let msg = util.format.apply(this, arguments)
	let time = chalk.green('[' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
	msg = msg.replace(/({|}|[|]|'|")/g, chalk.cyan('$1'))
	console.log('%s --> %s', time, msg)
}
