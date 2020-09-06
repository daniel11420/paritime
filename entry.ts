import * as fs from 'fs';
import * as keys from './keys.json';

if (keys["#keys"] === "Put ya keys here you fat cunt") {
    console.log("Keys file exists, starting.");
} else {
    console.log("Your keys file is missing or corrupted.");
    process.exit();
}

let main = require('./main');