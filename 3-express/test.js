import fs from "fs"

let dog = fs.createWriteStream("dogs.txt");

dog.write("meow!");