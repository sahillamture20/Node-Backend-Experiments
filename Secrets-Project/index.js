//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let isPasswordCorrect = false;
app.use(bodyParser.urlencoded({extended: true}));

function checkPassword(req, res, next) {
    const password = req.body.password;
    if (password === "ILoveProgramming") {
        isPasswordCorrect = true;
    }
    next();
}
app.use(checkPassword)


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/check", (req, res) => {
    // isPasswordCorrect ? res.sendFile(__dirname + "/public/secret.html") : res.sendFile(__dirname + "/public/index.html");
    // Alertnative - res.redirect()
    isPasswordCorrect ? res.sendFile(__dirname + "/public/secret.html") : res.redirect("/");

})  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });