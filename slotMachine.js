const prompt = require("prompt-sync")();
 

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

const deposit = () => {

    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberdepositAmount = parseFloat(depositAmount);

        if (isNaN(numberdepositAmount) || (numberdepositAmount <= 0)) {
            console.log('Invalid Amount');
        }
        else {
            return numberdepositAmount;
        }
    }

};

const getNumberofLines = () =>
{
    while (true) {
        const lines = prompt("Enter number of lines to bet on: ");
        const numberofLines = parseFloat(lines);

        if (isNaN(numberofLines) || (numberofLines <= 0) || (numberofLines > 3)) {
            console.log('Invalid Lines');
        }
        else {
            return numberofLines;
        }
    }
};

const getBet = (balance, numberofLines) =>
    {
        while (true) {
            const bet = prompt("Enter amount per line to bet on: ");
            const numberBet = parseFloat(bet);
    
            if ( (isNaN(numberBet) || (numberBet <= 0) || (numberBet > balance/numberofLines))) {
                console.log('Insufficient Balance');
            }
            else {
                return totalBetAmount = (numberBet*numberofLines);
            }
        }
    };

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0;i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0;i<COLS; i++)
    { reels.push([]);
        const reelSymbols = [...symbols];
        for (let j=0; j< ROWS; j++)
        {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) =>{
    const rows = [];
    for (let i=0;i<ROWS;i++){
        rows.push([]);
    for (let j=0;j< COLS;j++){
        rows[i].push(reels[j][i]);
    }
}
return rows;
}

const printRows = (rows) => {
    for (const row of rows){
        let rowString = '';
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i<= row.length-1){
                rowString += '|'
            }
        }
        console.log(rowString);
    }
};

const getWinning = (rows, bet, numberofLines)=> {
    let winnings= 0;
    for (let row = 0; row < numberofLines; row ++)
        {
            const symbols = rows[row];
            let allSame = true;

            for (const symbol of symbols)
            {
                if (symbol != symbols[0]){
                    allSame = false;
                    break;
                }
            }
            if (allSame){
                winnings += bet * SYMBOL_VALUES[symbols[0]];
            }

        } 
        return winnings;
}

const game = () =>{

let balance = deposit();

while (true){
console.log("You have a balance: $" +balance);
const numberofLines = getNumberofLines();
console.log(numberofLines);
const bet = getBet(balance, numberofLines);
console.log(totalBetAmount);
balance -= totalBetAmount;
const reels = spin();
console.log(reels);
const rows = transpose(reels);
console.log(rows);
printRows(rows);
const winnings = getWinning(rows,bet, numberofLines);
console.log("Congratulations, You Won: $" + winnings.toString());
balance += winnings;
if (balance <= 0){
    console.log("You ran out of money");
    break;
}
const playAgain = prompt("Do you want to play again?");
    if (playAgain != 'y') 
        break;}

};
game();