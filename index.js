require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.listen(3001);

app.set("view engine", "ejs");

app.use(express.static("public"));

const dbURL = process.env.DATABASE_URL;

mongoose
  .connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log("unable to connect to db"));

const QuoteSchema = new mongoose.Schema({
  quoteText: {
    type: String,
    required: true,
  },
  quoteAuthor: {
    type: String,
    required: true,
  },
});

const Quote = new mongoose.model("Quote", QuoteSchema);

app.get("/", (req, res) => {
  Quote.find()
    .then((result) => {
      res.render("index", {
        title: "Be Free!!",
        quote: result[(Math.random() * result.length) | 0],
      });
      //res.send(result[(Math.random()*result.length)|0]);
    })
    .catch((err) => {
      res.send("Keep Doing!!");
    });
});
