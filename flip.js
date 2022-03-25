// Import the coinFlip function from your coin.mjs file
import { coinFlip } from "./coin.mjs";

// Call the coinFlip function and put the return into STDOUT
console.log(coinFlip());  

function flipOneCoin() {
    return {"flip" : coinFlip()}
  }

export {flipOneCoin}; 