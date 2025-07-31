  const express = require("express");
  const fs = require("fs");
  const cors= require("cors");
  const { error } = require("console");
  const app = express();
  const rote = 5000;
  const axios = require("axios");

  app.get("/api/bitcoin-data", async (req, res) => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart", {
        params: {
          vs_currency: "usd",
          days: 7,
        }
      });
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ message: "err", error: err.message });
    }
  });

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
          res.status(401).json({ message: "erro" });
      }
  });

  app.get("/user-balance/:nickName", (req, res) => {
  const { nickName } = req.params;
  const data = fs.readFileSync("./user.json");
  const users = JSON.parse(data);
  const user = users.find((u) => u.nickName === nickName);
  if (user) {
    res.json({ balance: user.balance || 0 });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/update-balance", (req, res) => {
  const { nickName, balance } = req.body;

  const data = fs.readFileSync("./user.json");
  const users = JSON.parse(data);

  const userIndex = users.findIndex((u) => u.nickName === nickName);
  if (userIndex !== -1) {
    users[userIndex].balance = balance;
    fs.writeFileSync("./user.json", JSON.stringify(users, null, 2));
    res.status(200).json({ message: "Balance updated" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


  app.post("/register", (req, res) => {
    const { nickName, password } = req.body;

    if (!nickName || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const data = fs.readFileSync("./user.json");
    const users = JSON.parse(data);

    const userExists = users.find((u) => u.nickName === nickName);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    users.push({ nickName, password });

    fs.writeFileSync("./user.json", JSON.stringify(users, null, 2));
    return res.status(201).json({ message: "User registered" });
  });

  app.listen(rote, () => {
      console.log("start");
  });