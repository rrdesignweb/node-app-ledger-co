export const getLoanBalance = (field: any, LOAN_INPUT_ARRAY: any, PAYMENT_INPUT_ARRAY: any[]) => {
    let BANK: string = field[1];
    let BORROWER: string = field[2];
    let BAL_EMI_NO: number = field[3];

    let loans = LOAN_INPUT_ARRAY.find((item: any) =>
        item.BANK === BANK && item.BORROWER === BORROWER
    );

    let { EMI_AMOUNT } = calcEMIAmount(loans);

    let NO_OF_EMIS_REMAINING = loans.NO_OF_YEARS * 12 - BAL_EMI_NO;
    let TOTAL_AMOUNT_PAID = EMI_AMOUNT * BAL_EMI_NO;

    //PAYMENTS SECTION
    let payments = PAYMENT_INPUT_ARRAY && PAYMENT_INPUT_ARRAY.find(item => item.BANK === BANK && item.BORROWER === BORROWER && item.EMI_NO <= BAL_EMI_NO);
    let paymentsRaw: string;
    let paymentsObj: any;
    let LUMP_SUM_AMOUNT_ACC: any;

    if (payments !== undefined) {
        paymentsRaw = JSON.stringify(payments);
        paymentsObj = JSON.parse(paymentsRaw); //Convert Model to Obj
    }

    if (paymentsObj !== undefined) LUMP_SUM_AMOUNT_ACC = paymentsObj["LUMP_SUM_AMOUNT"];

    if (LUMP_SUM_AMOUNT_ACC) TOTAL_AMOUNT_PAID = parseInt(LUMP_SUM_AMOUNT_ACC) + TOTAL_AMOUNT_PAID;

    // if (TOTAL_AMOUNT_PAID > EMI_AMOUNT) {
    //   console.log("total amount paid is higher than total amount", TOTAL_AMOUNT_PAID, EMI_AMOUNT)
    // }

    return { TOTAL_AMOUNT_PAID, NO_OF_EMIS_REMAINING }
}

const calcEMIAmount = (loans: any) => {
    let MONTHS = 12 * loans.NO_OF_YEARS;
    const AMOUNT = loans.PRINCIPAL * Math.pow(1 + loans.RATE_OF_INTEREST / 100 / MONTHS, MONTHS * loans.NO_OF_YEARS);
    const INTEREST = Math.ceil(AMOUNT) - parseFloat(loans.PRINCIPAL);
    //let TOTAL_AMOUNT = parseFloat(loans.PRINCIPAL) + INTEREST;
    let EMI_AMOUNT = Math.ceil((parseFloat(loans.PRINCIPAL) + INTEREST) / MONTHS);
    return {
        //TOTAL_AMOUNT,
        EMI_AMOUNT
    };
}