// GLOBAL VARIABLES

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// FUNCTIONS

// Returns last two digits of the year
const getLastTwoDigits = (year) => {
    const lastTwoDigits = year % 100;
    return lastTwoDigits;
}

// Returns true if the year is leap
const isLeapYear = (year) => {
    if (year % 4 == 0 && year % 100 != 0) {
        return true;
    } else if (year % 400 == 0) {
        return true;
    }
    return false;
}

// Returns month code (subtracts 1 from code if the month is January or February in a leap year)
const getMonthCode = (month, year) => {
    const monthCodes = {
        January: 1, February: 4, March: 4, April: 0, May: 2, June: 5,
        July: 0, August: 3, September: 6, October: 1, November: 4, December: 6
    };
    if (isLeapYear(year) && (month === "January" || month === "February")) {
        return monthCodes[month] - 1;
    }
    return monthCodes[month];
}

// Returns additional offset if the year is found in a special range
const specialOffsets = (year) => {
    const specialYears = { 16: 6, 17: 4, 18: 2, 20: 6, 21: 4 };
    for (var element in specialYears) {
        if (Math.floor(year / 100) == element) {
            return specialYears[element];
        }
    }
    return 0;
}

// Goes through all required steps and returns the String value of the day of the week
const getDayOfTheWeek = (year, month, day) => {
    const stepOne = Math.floor(getLastTwoDigits(year) / 12);
    const stepTwo = getLastTwoDigits(year) % 12;
    const stepThree = Math.floor(stepTwo / 4);
    const stepFour = ((getMonthCode(month, year) + specialOffsets(year)) + day + stepOne + stepTwo + stepThree) % 7;
    return DAYS[stepFour];
}

// If month exists, returns a number of the days in a specified month, based on the year
const numberOfDaysInAMonth = (month, year) => {
    for (var value of MONTHS) {
        if (value == month) {
            /* checks the number of days in a previous month
             Link: https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript */
            const daysInMonth = new Date(year, MONTHS.indexOf(value) + 1, 0).getDate();
            return daysInMonth;
        }
    }
    return null;
}

// Prints out the calendar for year 2022
const makeCalendar = () => {
    const year = 2022;
    for (var i = 0; i <= MONTHS.length; i++) {
        for (var j = 1; j <= numberOfDaysInAMonth(MONTHS[i], year); j++) {
            console.log(`${i + 1}-${j}-${year} is a ${getDayOfTheWeek(year, MONTHS[i], j)}`);
        }
    }
}

// Returns month string without whitespace on both ends, and with first letter in uppercase
const fixMonthInput = (monthInput) => {
    if (typeof (monthInput) == "string" && monthInput.length != 0) {
        const noSpacing = monthInput.trim();
        const firstLetter = noSpacing.charAt(0).toUpperCase();
        const output = firstLetter + noSpacing.substring(1, noSpacing.length);
        return output;
    }
    return null;
}

// Validates the user's string(month) and number (year, day) inputs
const validInputCheck = (input) => {
    if (typeof (input) == "string") {
        if (input != null && MONTHS.indexOf(input) != -1) {
            return true;
        }
        return false;
    } else if (typeof (input) == "number" && !isNaN(input)) {
        if (input > 0) {
            return true;
        }
        return false;
    }
    return false;
}

// EXPORT FUNCTIONS

module.exports = { getDayOfTheWeek, fixMonthInput, validInputCheck, numberOfDaysInAMonth, makeCalendar };
