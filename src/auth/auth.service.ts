// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    const username = { payload };
    return this.jwtService.sign(username, {
      secret: process.env.JWT_SECRET,
    });
  }

  verifyToken(token: string): any {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
