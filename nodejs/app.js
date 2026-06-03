const fs = require('fs');
let data = "Hello from Node.js W"
fs.writeFileSync("hello.txt",data)
const text = fs.readFileSync('./hello.txt', 'utf8')
console.log(text)