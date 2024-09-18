const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const usersFilePath = "./data/users.json";

// Save user
app.post("/saveUser", (req, res) => {
  const newUser = req.body;
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving file");
      res.send("User saved");
    });
  });
});

// Get users
app.get("/getUsers", (req, res) => {
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.send(data);
  });
});

app.listen(3001, () => console.log("Server running on port 3001"));
