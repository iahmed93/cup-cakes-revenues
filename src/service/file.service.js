const moment = require('moment');


const processBasicFile = async (basicFile) => {
    const numbers = splitLines(basicFile);
    const map = convertToDateToNumberMap(numbers);
    return map;
}  


const processDeluxeFile = async (deluxeFile) => {
    const numbers = splitLines(deluxeFile);
    const map = convertToDateToNumberMap(numbers);
    return map;
}  


const processTotalFile = async (totalFile) => {
    const numbers = splitLines(totalFile);
    const map = convertToDateToNumberMap(numbers);
    return map;
} 

const splitLines = (fileString) => {
    const lines = fileString.split('\n');
    return lines.slice(1);
}

const convertToDateToNumberMap = (numbers) => {
    const dateToNumberMap = {};
    for(let i = numbers.length, day = 0; i >= 0; i--, day++){
        const date = moment().subtract(day, 'days').format("MM-DD-YYYY");
        dateToNumberMap[date] = Number.parseFloat(numbers[i]);
    }
    return dateToNumberMap;
}

module.exports = {
    processBasicFile,
    processDeluxeFile,
    processTotalFile
}
