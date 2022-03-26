export class LoanModel {
  constructor(BANK: string, BORROWER: string, PRINCIPAL: number, NO_OF_YEARS: number, RATE_OF_INTEREST: number) {
    this.BANK = BANK;
    this.BORROWER = BORROWER;
    this.PRINCIPAL = PRINCIPAL;
    this.NO_OF_YEARS = NO_OF_YEARS;
    this.RATE_OF_INTEREST = RATE_OF_INTEREST;
  }

  BANK: string;
  BORROWER: string;
  PRINCIPAL: number;
  NO_OF_YEARS: number;
  RATE_OF_INTEREST: number;
}

