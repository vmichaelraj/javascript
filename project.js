//console.log("hello world");
// deposit amount
// determine no of lines to bet on
// collect a bet amount 
// spin the slot machine 
// check if the user won 
// give the user their win 
// play again
const prompt=require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
}
const SYMBOL_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
}

function deposite(){
    while (true){
    const depositAmount=prompt("enter a deposite amount : ");
    const numberDepositAmount=parseFloat(depositAmount);

    if (isNaN(numberDepositAmount)|| numberDepositAmount<=0){
        console.log("invalid deposit amount or try again.");
    }else{
        return numberDepositAmount;
    }
    }
};

const getNumberOfLines=()=>{
    while(true){
    const lines=prompt("enter the no of lines to bet on (1-3) : ");
    const NumberOfLines=parseFloat(lines);

    if (isNaN(NumberOfLines)|| NumberOfLines<=0 || NumberOfLines>3){
        console.log("invalid no of lines, try again.");
    }else{
        return NumberOfLines;
    }
    }
};

const getBet=(balance,lines)=>{
    while(true){
        const bet=prompt("enter the total bet per line : ");
        const NumberBet=parseFloat(bet);
    
        if (isNaN(NumberBet)|| NumberBet<=0 || NumberBet>balance/lines){
            console.log("invalid bet, try again.");
        }else{
            return NumberBet;
        }
    }
};

const spin=()=>{
    const symbols=[];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

    const reels=[];
    for(let i=0;i<COLS;i++){
        reels.push([]);
        const reelSymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol= reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const transpose =(reels)=>{
    const rows=[];
    for (let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows=(rows)=>{
    for (const row of rows){
        let rowString="";
        for(const [i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString+="|";
            }
        }
        console.log(rowString);
    }
};

const getWinnings=(rows,bet,lines)=>{
    let winnings=0;
    for(let row=0;row<lines;row++){
        const symbols=rows[row];
        let allSame=true;
        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings+=bet*SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};


const game=()=>{
    let balance=deposite();
    while (true){
        console.log("You have a balance of $"+balance);
        const NumberOfLines=getNumberOfLines();
        const bet=getBet(balance,NumberOfLines);
        balance-=bet*NumberOfLines;
        const reels=spin();
        const rows=transpose(reels);
        printRows(rows);
        const winnings=getWinnings(rows,bet,NumberOfLines);
        balance+=winnings;
        console.log("You won, $"+ winnings.toString());
        if(balance<=0){
            console.log("You ran out of money!");
            break;
        }
        const playAgain=prompt("Do you want to play again (y/n)?");
        if(playAgain!="y") break;
    }
};

game();

