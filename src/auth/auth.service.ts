import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/interfaces/user.dto';
import { JwtPayload } from './interfaces/jwtPayload.dto';
import { RegistrationStatus } from './interfaces/registrationStatus.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async register(user: UserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'User is registered',
    };
    try {
      await this.usersService.createUser(user);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);
    if (user && await user.comparePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async validateUserToken(id: number): Promise<any> {
    return await this.usersService.getById(id);
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      expires_in: 3600,
      access_token: this.jwtService.sign(payload, {expiresIn: 3600}),
    };
  }
}
