import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let band = "";

// Always write at top otherwise it'll give error while accessing data from body  
app.use(bodyParser.urlencoded({ extended: true }));

function bandName(req, res, next) {
  console.log(req.body);
  band = req.body["street"] + req.body["pet"] + "✌️";
  next();
}

app.use(bandName);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`Your band name is ${band}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* Important Note:-

# res.send() = In Express.js, when you use res.send() method, it expects
either a string, Buffer, JSON object, or an array. It automatically sets
the status code to 200 (OK) unless specified otherwise. However, you're
trying to send a string "Your band name is " followed by a variable band,
which is not a valid HTTP status code.

Error Code:

app.post("/submit", (req, res) => {
  res.send("Your band name is ", band);
});

Error: RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: Your band name is 

Correct Code:

app.post("/submit", (req, res) => {
  // Assuming band is a variable containing the band name
  const band = "Your Band Name"; // Replace this with your band name
  const message = "Your band name is " + band;
  res.send(message);
});

OR

app.post("/submit", (req, res) => {
  // Assuming band is a variable containing the band name
  const band = "Your Band Name"; // Replace this with your band name
  const message = `Your band name is ${band}`;
  res.send(message);
});

*/
