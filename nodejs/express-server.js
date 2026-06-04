const express = require("express")
const app = express();

app.get("/", function (req,res){
    res.send("Home page");
})
app.get("/hello", function (req,res){
    res.send("Hello page");
})
app.use((req,res) => {
    res.status(404).send("404 not found");
})

app.listen(3000);