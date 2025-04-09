import { Injectable } from '@nestjs/common';
import * as staffData from '../data/staff.json';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(email: string, password: string) {
    const staff = staffData.find(
      (user) => user.email === email && user.password === password,
    );
    if (staff) {
      const { password, ...result } = staff;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
