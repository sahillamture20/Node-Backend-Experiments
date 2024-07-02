import express from'express';

const app = express();

app.get('/', (req, res) => { // Here '/' is home directory & we're using http method 'get'
    res.send("<h1>Hello World!!!</h1>");
})

app.get('/about', (req, res) => { 
    res.send("<h1>About me!</h1><p>I am Sahil</p>");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
