import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

let jokes = [];


// 0. GET all jokes
app.get("/jokes", (req, res) => {
  res.json(jokes);
})
//1. GET a random joke
app.get("/randon", (req, res) => {
  if(jokes.length > 10) {
    res.status(400).json({
      status: "Failed",
      message: "There are only 10 jokes in the database",
    });
    return;
  }else{
    const randomIndex = Math.floor(Math.random() * jokes.length);
    res.json(jokes[randomIndex]);
  }
})
//2. GET a specific joke
app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  const foundJoke = jokes.find((joke) => joke.id === id)
  res.json(foundJoke);
})
//3. GET a jokes by filtering on the joke type
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const filteredJokes = jokes.filter(joke => joke.jokeType === type);
  res.json(filteredJokes);
})
//4. POST a new joke
app.post("/jokes", (req, res) => {
  const newJoke = {id: jokes.length + 1, jokeText: req.body.text, jokeType: req.body.type}
  jokes.push(newJoke)
  res.json(newJoke)
  console.log(jokes.slice[-1]);
})
//5. PUT a joke
app.put("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedJoke = {
    id:parseInt(req.params.id),
    jokeText: req.body.text,
    jokeType: req.body.type
  };
  const jokeIndex = jokes.findIndex(joke => joke.id === id);
  jokes[jokeIndex] = updatedJoke;
  res.json(updatedJoke);

  // jokes[jokes.findIndex(joke => joke.id === parseInt(req.params.id))] = {
  //   id:parseInt(req.params.id),
  //   jokeText: req.body.text,
  //   jokeType: req.body.type
  // };
  // res.json({
  //   id:parseInt(req.params.id),
  //   jokeText: req.body.text,
  //   jokeType: req.body.type
  // });
})
//6. PATCH a joke
app.patch("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingJoke = jokes.find(joke => joke.id === id);
  const updatedJoke = {
    id:parseInt(req.params.id),
    jokeText: req.body.text || existingJoke.jokeText,
    jokeType: req.body.type || existingJoke.jokeType
  };
  const jokeIndex = jokes.findIndex(joke => joke.id === id);
  jokes[jokeIndex] = updatedJoke;
  res.json(updatedJoke);
})
//7. DELETE Specific joke
app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const jokeIndex = jokes.findIndex(joke => joke.id === id);
  if(jokeIndex > -1){
    jokes.splice(jokeIndex, 1);
    res.json({
      status: "Success",
      message: `Joke with id ${id} deleted successfully.`,
    })
  }else {
    res
      .status(500)
      .json({
        status: "Failed",
        message: `Joke with id ${id} does not exist.`,
      })
  }
})
//8. DELETE All jokes
app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if(userKey === masterKey) {
    jokes = [];
    res.json({
      status: "Success",
      message: `All jokes deleted successfully.`,
    })
  }else {
    res
      .status(500)
      .json({
        status: "Failed"
      })
  }
})
app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});


