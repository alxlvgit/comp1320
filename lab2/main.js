const lab2 = require("./lab-two");
const readline = require("readline-sync");

// GLOBAL VARIABLES

let year;
let month;
let day;
let endProgram = false;

// FUNCTIONS

//Outputs a day of the week
const getDayOfTheWeekForUserDate = (year, month, day) => {
    console.log(`The day of the week is ${lab2.getDayOfTheWeek(year, month, day)}. You checked for: ${month} ${day}, ${year}.`);
}

// INTERACTION WITH THE USER

// Start program in a loop, exit when all done
while (!endProgram) {
    console.log("Follow the instructions below to find out the day of the week.");

    // Loop through the year input until input satisfies all conditions
    let validYearInput = false;
    while (!validYearInput) {
        const yearInput = parseInt(readline.question("Please enter the year(e.g, 1999): "));
        if (lab2.validInputCheck(yearInput)) {
            year = yearInput;
            validYearInput = true;
        } else {
            console.log("Your year input is not correct. Please, try again.");
        }
    }

    // Loop through the month input until input satisfies all conditions
    let validMonthInput = false;
    while (!validMonthInput) {
        const monthInput = lab2.fixMonthInput(readline.question("Please enter the month(e.g., April): "));
        if (lab2.validInputCheck(monthInput)) {
            month = monthInput;
            validMonthInput = true;
        } else {
            console.log("Your month input is not correct. Please, try again.");
        }
    }

    // Loop through the day input until input satisfies all conditions
    let validDayInput = false;
    while (!validDayInput) {
        const dayInput = parseInt(readline.question("Please enter the day: "));
        if (dayInput <= lab2.numberOfDaysInAMonth(month, year) && lab2.validInputCheck(dayInput)) {
            day = dayInput;
            validDayInput = true;
        } else {
            console.log("Your day input is not correct. Please, try again.");
        }
    }

    // Print out the day of the week when all required inputs received
    getDayOfTheWeekForUserDate(year, month, day);

    // Loop through the user's input, print out calendar, exit program
    let responseReceived = false;
    while (!responseReceived) {
        const userResponse = readline.question("Would you wish to print out a calendar for the year 2022?(Enter Y to proceed or N to exit)");
        if (userResponse == "Y" || userResponse == "y") {
            lab2.makeCalendar();
            responseReceived = true;
        } else if (userResponse == "N" || userResponse == "n") {
            responseReceived = true;
        }
    }

    // Exit program 
    endProgram = true;
}





