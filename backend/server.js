const express = require("express");
const fs = require("fs");
const cors= require("cors");
const { error } = require("console");
const app = express();
const rote = 3000;

app.use(cors());
app.use(express.json());
app.post("/login", (req, res) => {
    const {nickName, password } = req.body;
    const Data = fs.readFileSync("./user.json");
    const user=JSON.parse(Data);
    
    const userFind = user.find(
        (user) => user.nickName === nickName && user.password === password
    )
    if(userFind) {
        res.status(200).json({ message: "works" });
    }else{
        res.status(404).json({ message: "erro" });
    }
});

app.listen(rote, () => {
    console.log("start");
});