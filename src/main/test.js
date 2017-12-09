
let reg = new RegExp(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,5}$/)

console.log(reg.test('192.168.1'))
console.log(reg.test('192.168.1.1.1'))
console.log(reg.test('1922.168.1.12'))
console.log(reg.test('192.168.1.4:886'))
console.log(reg.test('192.168.1.1:80'))
console.log(reg.test('192.168.1.1:809999'))

function parseUrls(urls) {
    return urls.split(',').map(function (url) {
        let matcher = url.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{2,5})$/)
        console.log(matcher)
        return {
            host: matcher[1],
            port: matcher[2]
        }
    })
}

console.log(parseUrls('192.168.2.5:80,192.168.4.5:81'))
