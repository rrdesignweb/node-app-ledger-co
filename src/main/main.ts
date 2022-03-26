//Pkgs
const path = require("path");
const fs = require("fs");
const readline = require("readline");

//Models
const { LoanModel } = require("../models/loan");
const { PaymentModel } = require("../models/payment");

//Funcs
const { getLoanBalance } = require("../functions/index")

//Input
const inputTxtPath1 = "./../../sample-input/input1.txt";
const inputTxtPath2 = "./../../sample-input/input2.txt";
const inputTxtFile1 = fs.createReadStream(path.resolve(__dirname, inputTxtPath1));
const inputTxtFile2 = fs.createReadStream(path.resolve(__dirname, inputTxtPath2));

const COMMANDS = {
  LOAN: "LOAN",
  PAYMENT: "PAYMENT",
  BALANCE: "BALANCE",
};

let LOAN_INPUT_ARRAY: any[] = [];
let PAYMENT_INPUT_ARRAY: any[] = [];
//let BALANCE_INPUT_ARRAY: any[] = [];

const userPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}).question("Press enter to continue... ", function () {

  const rl = readline.createInterface({
    input: inputTxtFile1, 
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", function (line: any) {
    let field: any = line.split(" ");
    let LINE_ACTION: string = field[0];

    if (LINE_ACTION === COMMANDS.LOAN) {
      LOAN_INPUT_ARRAY.push(new LoanModel(
        field[1],
        field[2],
        field[3],
        field[4],
        field[5]
      ));
    }
    if (LINE_ACTION === COMMANDS.PAYMENT) {
      PAYMENT_INPUT_ARRAY.push(new PaymentModel(
        field[1],
        field[2],
        field[3],
        field[4])
      );
    }
    if (LINE_ACTION === COMMANDS.BALANCE) {
      const { TOTAL_AMOUNT_PAID, NO_OF_EMIS_REMAINING } = getLoanBalance(field, LOAN_INPUT_ARRAY, PAYMENT_INPUT_ARRAY);
      console.log(field[1], field[2], TOTAL_AMOUNT_PAID, NO_OF_EMIS_REMAINING);
      return;
    }
  });

  rl.on("close", function () {
    console.log("\nKey in 'rs' and hit enter to start again");
    process.exit(0);
  });
});
