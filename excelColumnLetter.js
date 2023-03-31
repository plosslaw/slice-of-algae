// ? Problem: Convert the zero-based index of an excel column to its given column letter name
// ? e.g. 0th column -> A, 5th column -> F, 27th column -> AB


// * tested up to 100,000,000 using bruteForceTestExcelColumnLetters
const convertZeroBasedIndexToExcelColumnLetter = (index) => {
    let output = '';
    let columnIndex = Number(index);

    // 26 -> AA
    // 26 + 26 -> BA
    // 26 + 26 * 26 -> AAA = 26 + 26^2
    // 26 + 26^2 + 26 * 26 -> BAA
    // 26 + 26^2 + 26^3 -> AAAA
    // 26 + 26^2 + 26^3 + 26^3 -> BAAA
    // 26 + 26^2 + 26^3 + 26^4 -> AAAAA

    // single character column
    if (columnIndex < 26) {
        return String.fromCharCode(65 + columnIndex);
    }

    // double character column
    if (columnIndex < 26 + 26 ** 2) {
        // first character
        // first character is offset by 1, 1 -> A instead of 0 -> A
        // so use 64 instead of 65
        output += String.fromCharCode(64 + Math.floor(columnIndex / 26));
        columnIndex %= 26;

        // second character
        // columnIndex should be < 26 at this stage
        output += String.fromCharCode(65 + columnIndex);
        return output;
    }

    // triple character column
    if (columnIndex < 26 + 26 ** 2 + 26 ** 3) {
        // first character
        columnIndex -= 26 + 26 ** 2; // provides +1

        // first character is offset by 1, 1 -> A instead of 0 -> A
        // so use 64 instead of 65
        output += String.fromCharCode(64 + Math.floor(columnIndex / (26 * 26)) + 1);
        columnIndex %= 26 * 26;

        // second character
        output += String.fromCharCode(65 + Math.floor(columnIndex / 26));
        columnIndex %= 26;

        // third character
        // columnIndex should be < 26 at this stage
        output += String.fromCharCode(65 + columnIndex);
        return output;
    }

    function getPowerTerms(n) {
        let result = 0;

        for (let i = 1; i <= n; i++) {
            result += 26 ** i;
        }

        return result;
    }

    let maxCounter = 1;

    while (index >= getPowerTerms(maxCounter)) {
        maxCounter++;
    }

    // one less than exceeded maxCounter
    maxCounter--;

    // first character
    columnIndex -= getPowerTerms(maxCounter); // provides +1
    // first character is offset by 1, 1 -> A instead of 0 -> A
    // so use 64 instead of 65
    output += String.fromCharCode(64 + Math.floor(columnIndex / (26 ** maxCounter)) + 1);
    columnIndex %= 26 ** maxCounter;

    for (let i = maxCounter - 1; i >= 1; i--) {
        output += String.fromCharCode(65 + Math.floor(columnIndex / (26 ** i)));
        columnIndex %= 26 ** i;
    }

    // last character
    // columnIndex should be < 26 at this stage
    output += String.fromCharCode(65 + columnIndex);
    return output;
};

const bruteForceTestExcelColumnLetters = (n) => {
    const digitToLetterMap = new Map();
    for (let i = 0; i < 26; i++) {
        digitToLetterMap.set(i, String.fromCharCode(65 + i));
    }

    const numberArray = [];

    for (let i = 0; i < n + 1; i++) {
        if (numberArray.length === 0) {
            numberArray.push(0);
        } else {
            let indexToIncrement = 0;
            for (let j = 0; j < numberArray.length; j++) {
                if (numberArray[j] % 26 === 25) {
                    indexToIncrement++;
                } else {
                    break;
                }
            }
            if (indexToIncrement === numberArray.length) {
                numberArray.push(0);
                for (let k = 0; k < numberArray.length; k++) {
                    numberArray[k] = 0;
                }
            } else {
                numberArray[indexToIncrement] += 1;
                for (let k = 0; k < indexToIncrement; k++) {
                    numberArray[k] = 0;
                }
            }
        }
        const output = numberArray.map((ele) => digitToLetterMap.get(ele)).reverse().join('');
        const testOutput = convertZeroBasedIndexToExcelColumnLetter(i);
        if (testOutput !== output) {

            console.log(`${ i }. test: ${ testOutput }, expected: ${ output }`);
        }
    }
};


const args = process.argv.slice(2);

bruteForceTestExcelColumnLetters(args.length > 0 ? Number(args[0]) : 10000)
