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
const contents = fs.readFileSync('data/answers_tagging.tsv', 'utf-8');
const lines = contents.split("\n");

//Go through every line and see if we can label it
for (let i = 1; i < lines.length; i++) {
    //First check if this line has any useful data to label, if not skip it
    let parts = lines[i].split("\t");
    let replies = [];
    if (parts[parts.length - 1].trim().length > 0) {
        //If we have data, log what answer we're at, and show that
        cls();
        console.log(header("answer " + i + " of " + lines.length));
        console.log(parts[7]);
        console.log(chalk.grey("Current tags: ") + (parts.length > 8 ? parts[8] : "-"));
        let reply = readline.question(chalk.grey("Add Tags: "));
        reply.toLowerCase();
        replies = reply.split(",");
        for(let i = 0; i < replies.length; i++){
            replies[i] = replies[i].trim().toLowerCase();
        }
    }

    //If we haven't defined tags yet, add them, else add to existing tags
    if(parts.length <= 8){
        parts.push(replies.join("|"));
    }
    // else{
    //     let oldRep = parts[8].split("|");
    //     for(rep of replies){
    //         if(oldRep.indexOf(rep) > -1) continue;
    //         else oldRep.push(rep);
    //     }
    //     parts[8] = oldRep.join("|");
    // }
    lines[i] = parts.join("\t");

    //After every reply, save it to disk
    fs.writeFileSync("data/answers_tagging.tsv", lines.join("\n", "utf-8"));
}


/**
 * Turns the provided string into a header string
 * @param {String} string 
 */
function header(string){
    const border = "=".repeat(string.length + 4);
    return border + "\n| " + chalk.bold(string) + "|\n" + border;
}

/**
 * Clear the screen function
 */
function cls() {
    console.log(blank)
    rl.cursorTo(process.stdout, 0, 0)
    rl.clearScreenDown(process.stdout)
}