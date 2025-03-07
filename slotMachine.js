// steps to slot machine project
// deposit amount
// determine no of lines to bet on
// collect a bet amount
// spin the slot machine
// check if the user won
// give the user their win
// play again

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

function deposit() {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount : ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount or try again.");
    } else {
      return numberDepositAmount;
    }
  }
}

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the no of lines to bet on (1-3) : ");
    const NumberOfLines = parseFloat(lines);

    if (isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3) {
      console.log("Invalid no of lines, try again.");
    } else {
      return NumberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the total bet per line : ");
    const NumberBet = parseFloat(bet);

    if (isNaN(NumberBet) || NumberBet <= 0 || (NumberBet*lines) > balance) {
      console.log("Invalid bet, try again.");
    } else {
      return NumberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  console.log("Result :");
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += "|";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;  
  let matchedLines = 0;  

  for (let row = 0; row < ROWS; row++) { 
      if (matchedLines === lines) break;

      const symbols = rows[row];  
      let allSame = symbols.every(symbol => symbol === symbols[0]);  

      if (allSame) {  
          winnings += bet * SYMBOL_VALUES[symbols[0]];
          matchedLines++;  
      }
  }

  return winnings;  
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balance of $" + balance.toFixed(2));
    const NumberOfLines = getNumberOfLines();
    const bet = getBet(balance, NumberOfLines);
    balance -= bet * NumberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, NumberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());
    if (balance <= 0) {
      console.log("You ran out of money! please deposit money and restart");
      break;
    }
    const playAgain = prompt("Do you want to play again (y/n)? ")
      .trim()
      .toLowerCase();
    if (playAgain != "y") {
      console.log(
        "Thanks for playing! final balance is: $" + balance.toFixed(2)
      );
      break;
    }
  }
};

game();
