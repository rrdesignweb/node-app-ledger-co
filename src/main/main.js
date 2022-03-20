const path = require("path");
const fs = require("fs");
const readline = require("readline");

const inputTxtPath1 = "./../../sample-input/input1.txt";
const inputTxtPath2 = "./../../sample-input/input2.txt";

let inputTxtFile1 = fs.createReadStream(path.resolve(__dirname, inputTxtPath1));
let inputTxtFile2 = fs.createReadStream(path.resolve(__dirname, inputTxtPath2));

const CONSTANTS = {
  LOAN: "LOAN",
  PAYMENT: "PAYMENT",
  BALANCE: "BALANCE",
};

const amountCalcFunc = (P, N, R) => {
  let months = 12 * N;
  const amount = P * Math.pow(1 + R / 100 / months, months * N);
  const interest = amount - parseFloat(P);
  let totalAmount = parseFloat(P) + interest;
  let totalEMI = (parseFloat(P) + interest) / months;
  return {
    totalAmount,
    totalEMI,
  };
};

const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumSignificantDigits: 2,
});

let LOAN_ARRAY = [];
let BALANCE_ARRAY = [];
let PAYMENT_ARRAY = [];

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt.question("What action you want to take? ", function (action) {
  const rl = readline.createInterface({
    input: inputTxtFile1, //dynamic based on user input?
    output: process.stdout,
    terminal: false,
  });
  rl.on("line", function (line) {
    const field = line.split(" ");
    const LINE_ACTION = field[0];

    if (LINE_ACTION === CONSTANTS.LOAN)
      LOAN_ARRAY.push({
        action: field[0],
        bank: field[1],
        borrower: field[2],
        principal: field[3],
        years: field[4],
        rate: field[5],
      });

    if (LINE_ACTION === CONSTANTS.BALANCE)
      BALANCE_ARRAY.push({
        action: field[0],
        bank: field[1],
        borrower: field[2],
        emiNo: field[3],
      });

    if (LINE_ACTION === CONSTANTS.PAYMENT)
      PAYMENT_ARRAY.push({
        action: field[0],
        bank: field[1],
        borrower: field[2],
        lumpSum: field[3],
        emi: field[4],
      });
  });

  rl.on("close", function () {
    if (action.toUpperCase() === CONSTANTS.LOAN) {
      if (LOAN_ARRAY.length > 0) {
        LOAN_ARRAY &&
          LOAN_ARRAY.map((loan) => {
            const { totalEMI } = amountCalcFunc(
              loan.principal,
              loan.years,
              loan.rate
            );

            BALANCE_ARRAY &&
              BALANCE_ARRAY.map((bal) => {
                if (loan.borrower === bal.borrower) {
                  const totalEmiPayment = totalEMI * bal.emiNo;
                  const emi_left = loan.years * 12 - bal.emiNo;
                  console.log(
                    loan.bank,
                    loan.borrower,
                    Math.ceil(totalEmiPayment),
                    emi_left
                  );
                }
              });
          });
      } else {
        console.log("No loan line items");
      }
    }

    if (action.toUpperCase() === CONSTANTS.PAYMENT) {
      if (PAYMENT_ARRAY.length > 0) {
        PAYMENT_ARRAY &&
          PAYMENT_ARRAY.map((payment) => {
            console.log(
              payment.bank,
              payment.borrower,
              payment.lumpSum,
              payment.emiNo
            );
          });
      } else {
        console.log("No payment line items");
      }
    }

    if (action.toUpperCase() === CONSTANTS.BALANCE) {
      if (BALANCE_ARRAY.length > 0) {
        BALANCE_ARRAY &&
          BALANCE_ARRAY.map((bal) => {
            console.log(bal.bank, bal.borrower, bal.emiNo);
          });
      } else {
        console.log("No balance line items");
      }
    }
  });

  rl.on("close", function () {
    console.log("\nKey in 'rs' and hit enter to start again");
    process.exit(0);
  });

  prompt.close();
});
