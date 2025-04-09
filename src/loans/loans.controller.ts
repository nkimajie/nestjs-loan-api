import {
  Controller, Get, Param, Query, Delete, UseGuards, Req
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('loans')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  @Roles('staff', 'admin', 'superAdmin')
  getLoans(@Req() req, @Query('status') status?: string) {
    if (status) return this.loansService.getLoansByStatus(status);
    return this.loansService.getAllLoans(req.user.role);
  }

  @Get(':userEmail/get')
  @Roles('staff', 'admin', 'superAdmin')
  getByEmail(@Param('userEmail') email: string) {
    return this.loansService.getLoansByUserEmail(email);
  }

  @Get('expired')
  @Roles('staff', 'admin', 'superAdmin')
  getExpired() {
    return this.loansService.getExpiredLoans();
  }

  @Delete(':loanId/delete')
  @Roles('superAdmin')
  deleteLoan(@Param('loanId') id: string) {
    const deleted = this.loansService.deleteLoanById(id);
    return deleted ? { message: 'Loan deleted' } : { message: 'Loan not found' };
  }
}