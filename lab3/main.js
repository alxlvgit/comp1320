const mathHelpers = require("./mathHelpers");
const fs = require("fs");
const process = require("process");

// GLOBAL VARIABLES
let mainDirName = "dataPoints";

// FUNCTIONS

// Checks for valid inputs. Returns object with inputs, if all valid
const validateInputs = () => {
    const points = new Object;
    const values = ["x1", "y1", "x2", "y2"];
    if (process.argv.length == 6) {
        for (i = 2; i < process.argv.length; i++) {
            const number = parseFloat(process.argv[i]);
            if (typeof number != "number" || isNaN(number)) {
                return null;
            }
            points[values[i - 2]] = number;
        }
        return points;
    }
    return null;
}

// Writes points to txt file. Appends calculated distance to the same txt file
const writeToFile = (filePath, inputs) => {
    const distance = mathHelpers.distance(inputs.x1, inputs.y1, inputs.x2, inputs.y2).toString();
    fs.writeFile(`${filePath}/points.txt`, JSON.stringify(inputs), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Content saved");
            fs.appendFile(`${filePath}/points.txt`,
                `\nThe distance between your two points:(${inputs.x1}, ${inputs.y1}), (${inputs.x2}, ${inputs.y2}) is ${distance}`,
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
    });
}

// If inputs are valid: create new folder, add txt file inside the folder, write points in txt file, append distance in the same file
const processInput = (folderName, inputs) => {
    if (inputs != null) {
        fs.mkdir(folderName, (err) => {
            if (err && err.code === "EEXIST") {
                folderName = `temp_${folderName}`;
                processInput(folderName, inputs);
            }
            else if (err && err.code !== "EEXIST") {
                console.log(err);
            }
            else {
                if (folderName === mainDirName) {
                    console.log("Directory dataPoints successfully created");
                }
                else {
                    console.log(`Folder ${folderName.substring(5, folderName.length)} already exists. Creating a new folder for you called ${folderName}.`);
                }
                writeToFile(folderName, inputs);
            }
        });
    }
    else {
        console.log("Invalid inputs. Please try again");
    }
};

// Calling function
processInput(mainDirName, validateInputs());
