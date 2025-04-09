import { Injectable } from '@nestjs/common';
import * as loanData from '../data/loan.json';
import { parseISO, isBefore } from 'date-fns';

@Injectable()
export class LoansService {
  private loans = loanData;

  getAllLoans(role: string) {
    return this.loans.map((loan) => {
      if (role === 'staff') {
        const { applicant, ...rest } = loan;
        return {
          ...rest,
          applicant: { ...applicant, totalLoan: undefined },
        };
      }
      return loan;
    });
  }

  getLoansByStatus(status: string) {
    return this.loans.filter((loan) => loan.status === status);
  }

  getLoansByUserEmail(email: string) {
    return {
      loans: this.loans.filter((loan) => loan.applicant.email === email),
    };
  }

  getExpiredLoans() {
    const now = new Date();
    return this.loans.filter((loan) =>
      isBefore(parseISO(loan.maturityDate), now)
    );
  }

  deleteLoanById(id: string): boolean {
    const index = this.loans.findIndex((loan) => loan.id === id);
    if (index !== -1) {
      this.loans.splice(index, 1);
      return true;
    }
    return false;
  }
}