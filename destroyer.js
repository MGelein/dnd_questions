const fs = require('fs');

const lines = fs.readFileSync('data/answers.tsv', 'utf-8').split("\n");
const newLines = [];
for(let line of lines){
    let parts = line.split('\t');
    parts.splice(0, 1);
    parts.splice(parts.length - 1, 1);
    newLines.push(parts.join(","));
}
fs.writeFileSync("answers_stripped.csv", newLines.join("\n"), "utf-8");