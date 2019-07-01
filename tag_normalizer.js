const fs = require('fs');
const lines = fs.readFileSync('data/answers_tagging.csv', 'utf-8').split("\n");
const newLines = [];
let taggedCounter = 0;
for(let line of lines){
    let parts = line.split(',');
    if(parts.length < 9) {
        newLines.push(line);
        continue;
    }
    let tagPart = parts[8];
    if(tagPart == undefined || tagPart.trim().length < 1) {
        newLines.push(line);
        continue;
    }
    tagPart = tagPart.split(" ").join("|");
    let tags = tagPart.split("|");
    let newTags = [];
    for(tag of tags){
        if(newTags.indexOf(tag) == -1) newTags.push(tag);
    }
    parts[8] = newTags.join("|");
    newLines.push(parts.join(","));
    taggedCounter++;
}
console.log(taggedCounter + " answers were tagged");
fs.writeFileSync("data/answers_cleaned_final.csv", newLines.join("\n"), "utf-8");