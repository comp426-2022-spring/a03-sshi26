// Require Express.js
const express = require('express')
const app = express()

const myArgs = process.argv.slice(2);
const portNumber = (myArgs.length == 0 || myArgs[0].length <= 7) ? 1 : parseInt(myArgs[0].substring(7));

// Import coin functions 
const {flipAgainstSide, flipOneCoin, manyflips} = require('./coin.js');

// Start an app server
const server = app.listen(portNumber, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', portNumber))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

// /app/flip/ endpoint 
app.get('/app/flip/', (req, res) => {
  res.send(flipOneCoin()); 
}) 

app.get('/app/flips/:number', (req, res) => {
    const flips = manyflips(req.params.number)
    res.send(flips); 
});

app.get('/app/flip/call/heads', (req, res) => {
    let heads = "heads"; 
    const answer = flipAgainstSide(heads);
    res.send(answer); 
});

app.get('/app/flip/call/tails', (req, res) => {
    let tails = "tails"; 
    const answer = flipAgainstSide(tails)
    res.send(answer); 
});

// Default response for any other request
app.all('*', function(req, res){
  res.status(404).send('404 NOT FOUND')
});

