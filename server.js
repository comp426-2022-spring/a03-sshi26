// Require Express.js
const express = require('express')
const app = express()

const myArgs = process.argv.slice(2);
const portNumber = (myArgs.length == 0 || myArgs[0].length <= 7) ? 1 : parseInt(myArgs[0].substring(7));

// Start an app server
const server = app.listen(portNumber, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', portNumber))
});

// Default response for any other request
// app.use(function(req, res){
//     res.status(404).send('404 NOT FOUND')
// });

// /app/flip/ endpoint 
app.get('/app/flip/', (req, res) => {
    res.send(flipOneCoin()); 
}) 

app.get('/app/', (res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/app/flips/:number', (req, res) => {
    const flips = manyflips(req.params.number)
    res.send(flips); 
});

app.get('/app/flips/call/heads', (res) => {
    res.send(flipAgainstSide(heads)); 
});


app.get('/app/flips/call/tails', (res) => {
    res.send(flipAgainstSide(tails)); 
});



// Helper Functions
function flipAgainstSide(side) {
    return flipACoin(side);
}

function flipOneCoin() {
    return {"flip" : coinFlip()}
}


function manyflips(flips) {
    const flipArray = coinFlips(flips); 
    return {"raw":flipArray, "summary":countFlips(flipArray)}
}


// CoinFlip Functions

function coinFlip() {
    const sides = ["heads", "tails"]
    return sides[Math.floor(Math.random()*sides.length)];
}

function coinFlips(flips) {
    let answer = Array(flips); 
    for (let i=0; i < flips; i++) {
      answer[i] = coinFlip(); 
    }
    return answer; 
  }

  function countFlips(array) {
    let h = 0; 
    let t = 0; 
    for (let i = 0; i< array.length; i++) {
      h+=array[i] == 'heads' ? 1:0; 
      t+=array[i] == 'heads' ? 0:1; 
    }
    if (t == 0) {
      return {"heads": h}; 
    }
    if (h == 0) {
      return {"tails": t}; 
    }
  
    return {"tails": t, "heads": h}; 
  }

  function flipACoin(call) {
    const flip = coinFlip();
    return { "call":call, "flip":flip, result: flip == call ? 'win':'lose' }; 
  }