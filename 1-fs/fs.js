import fs from "fs";
const command = process.argv[2];

if(command === "read") {

    fs.readFile('../pets.json', 'utf8', (error, data) => {
        

        if (error) {
            console.error('Usage: node fs.js read INDEX');
            process.exit(1);

        }
        const jsonData = JSON.parse(data);
        let index = Number.parseInt(process.argv[3]);

        if (jsonData[index] === undefined) {
            console.error('Usage: node fs.js read INDEX');
            process.exit(1);
        
        } else if (typeof index === 'number' && !isNaN(index)) {

            
            console.log(jsonData[index]);

        } else {

            console.log(jsonData);

        }

        
    })

} else if (command === "create") {
    const petAge = Number.parseInt(process.argv[3]);
    const petKind = process.argv[4];
    const petName = process.argv[5];

    const newAnimal = {
        age: petAge,
        kind: petKind,
        name: petName
    };
    if (process.argv.length < 5 || isNaN(petAge) === true) {
        console.error("Usage: node fs.js create AGE KIND NAME");
        process.exit(1);
    } else {
        fs.readFile('../pets.json', 'utf8', (error, data) => {
            
            if(error) {
             console.error("Usage: node fs.js create AGE KIND NAME");
             process.exit(1);
            }
            
            const jsonData = JSON.parse(data);
            jsonData.push(newAnimal);
            const stringData = JSON.stringify(jsonData);
            fs.writeFile('../pets.json', stringData, (error) => {
                if (error) {
                    console.error("error");

                } else {
                    console.log(JSON.stringify(newAnimal));
                }

            });

        });
    };


} else {
    console.error("Usage: node fs.js [read | create | update | destroy]");
    process.exit(1);
    }