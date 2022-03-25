import {flipACoin, countFlips } from "./modules/coin.mjs";
const myArgs = process.argv.slice(2);

const inputString = (myArgs.length == 0 || !['heads', 'tails'].includes(myArgs[0].substring(7))) ? null : myArgs[0].substring(7);


if (inputString == null) {
    console.log("Error: no input."); 
    console.log("Usage: node guess-flip --call=[heads|tails]");
    process.exit();
}

const results = flipACoin(inputString); 
console.log(results); 