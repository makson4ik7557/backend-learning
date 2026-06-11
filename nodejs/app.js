/*
const fs = require('fs');
let data = "Hello from Node.js W"
fs.writeFileSync("hello.txt",data)
const text = fs.readFileSync('./hello.txt', 'utf8')
console.log(text)
 */
let basicId = 0;
const users = [
    { id: 1, name: "Максим", age: 19 },
    { id: 2, name: "Андрій", age: 25 },
];

const markets = [
    { id: basicId += 1, question: "Will trump say the word Ukraine", price: 5, status: "unresolved"},
    { id: basicId += 1, question: "Will BTC hit 200k before GTA 6", price: 2, status: "unresolved"},
    { id: basicId += 1, question: "Will BTC hit 60k before GTA 6", price: 2, status: "resolved"},
];

const express = require("express");
const app = express();
let port = 3000;

app.use(express.json());

app.get('/users', (req,res) => {
    res.json(users);
});

app.get('/users/:id', (req,res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if(!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
})

app.get('/markets', (req,res) => {
    const status = req.query.status;
    if(status) {
        const filteredMarkets = markets.filter(m => m.status === status)
        res.json(filteredMarkets);
    }
    else {
        res.json(markets);
    }
})

app.get('/markets/:id', (req, res) => {
    const market = markets.find(m => m.id === Number(req.params.id));
    if(!market) return res.status(404).json({ message: 'Not found the market with such id'});
    return res.json(market);
})
app.post('/markets', (req, res) => {
    const {question , price , status} = req.body;
    if(!question || !price || !status) return res.status(400).json({error: "You should fill your question , price and status!"});
    const newMarket = {
        id: basicId += 1,
        question: question,
        price: price,
        status: status
    };
    markets.push(newMarket);
    res.status(201).json(newMarket);
});

app.patch('/markets/:id', (req, res) => {
    let market = markets.find(m => m.id === Number(req.params.id));
    if(!market) return res.status(404).json({error: 'Not found the market with such id'});
    const {status} = req.body;
    market.status = status;
    res.json(market);
})

app.delete('/markets/:id', (req, res) => {
    const marketId = markets.findIndex(m => m.id === Number(req.params.id))
    if(marketId === -1) return res.status(404).json({message: 'Not found the market with such id'});
    markets.splice(marketId, 1);
    res.status(204).end();
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});