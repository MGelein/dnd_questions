/**
 * This file is used to label the answers that people have given to the open questions
 */
const fs = require('fs');
const readline = require('readline-sync');


//Read and split the file
const contents = fs.readFileSync('data/answers.tsv', 'utf-8');
const lines = contents.split("\n");

//Go through every line and see if we can label it
for(let i = 0; i < lines.length; i++){
    //First check if this line has any useful data to label, if not skip it
    let parts = lines[i].split("\t");
    if(parts[parts.length - 1].trim().length < 1) continue;
    //If we have data, log what answer we're at, and show that
    console.log("answer " + i + " of " + lines.length);
}