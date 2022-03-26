export class PaymentModel {
    constructor(BANK: string, BORROWER: string, LUMP_SUM_AMOUNT: string, EMI_NO: string) {
        this.BANK = BANK;
        this.BORROWER = BORROWER;
        this.LUMP_SUM_AMOUNT = LUMP_SUM_AMOUNT;
        this.EMI_NO = EMI_NO;
    }
    BANK: string;
    BORROWER: string;
    LUMP_SUM_AMOUNT: string;
    EMI_NO: string;
}