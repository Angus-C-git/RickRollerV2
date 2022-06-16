import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (!user) return null;

    const validCredentials = await bcrypt.compare(pass, user.password);
    if (!validCredentials) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async issueToken(user: any) {
    const payload = { username: user.username, uid: user._id };
    return this.jwtService.sign(payload);
  }
}
