/**
 * This file is used to label the answers that people have given to the open questions
 */
const fs = require('fs');
const chalk = require('chalk');
const rl = require('readline');
const readline = require('readline-sync');

//How much room do we need to make the screen blank?
const blank = '\n'.repeat(process.stdout.rows);

//Read and split the file
const contents = fs.readFileSync('data/answers.tsv', 'utf-8');
const lines = contents.split("\n");

//Go through every line and see if we can label it
for(let i = 1; i < lines.length; i++){
    //First check if this line has any useful data to label, if not skip it
    let parts = lines[i].split("\t");
    if(parts[parts.length - 1].trim().length < 1) continue;
    //If we have data, log what answer we're at, and show that
    cls();
    let headerLine = "answer " + i + " of " + lines.length;
    console.log("=".repeat(headerLine.length + 4));
    console.log("| " + chalk.bold(headerLine) + " |");
    console.log("=".repeat(headerLine.length + 4));
    console.log(parts[parts.length - 1].trim());
    let reply = readline.question(chalk.grey("tags: "));
}

/**
 * Clear the screen function
 */
function cls() {
    console.log(blank)
    rl.cursorTo(process.stdout, 0, 0)
    rl.clearScreenDown(process.stdout)
}