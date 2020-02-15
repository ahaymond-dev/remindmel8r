const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/map", function(req, res) {
    res.sendFile(path.join(__dirname, "map.html"));
  });
app.get("/reminders", function(req, res) {
    res.sendFile(path.join(__dirname, "list.html"));
  });


  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });