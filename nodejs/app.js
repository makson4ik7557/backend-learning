/*
const fs = require('fs');
let data = "Hello from Node.js W"
fs.writeFileSync("hello.txt",data)
const text = fs.readFileSync('./hello.txt', 'utf8')
console.log(text)
 */
const users = [
    { id: 1, name: "Максим", age: 19 },
    { id: 2, name: "Андрій", age: 25 },
];

const express = require("express");
const app = express();

app.get('/users', (req,res) => {
    res.json(users);
});

app.get('/users/:id', (req,res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if(!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
})

app.listen(3000);