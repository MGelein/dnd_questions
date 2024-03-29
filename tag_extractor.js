const fs = require('fs');

const lines = fs.readFileSync('data/answers_cleaned_final.csv', "utf-8").split("\n");
const tagDict = {};
for(let line of lines){
    const parts = line.split(",");
    if(parts.length < 9) continue;
    tagLine = parts[parts.length - 1];
    tagLine = tagLine.split(" ").join("|");
    tags = tagLine.split("|");
    for(let tag of tags){
        tag = tag.trim().toLowerCase();
        if(tagDict[tag] == undefined){
            tagDict[tag] = 1;
        }else{
            tagDict[tag] ++;
        }
    }
}

const keys = Object.keys(tagDict);
const output = [];
for(let key of keys){
    if(key.trim().length < 1) continue;
    output.push((key).trim().toLowerCase() + " = " + tagDict[key]);
}
fs.writeFileSync('data/tags.txt', output.join('\n'), 'utf-8');