import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {UserDto} from '../users/interfaces/user.dto';
import {RegistrationStatus} from './interfaces/registrationStatus.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(user: UserDto) {
    console.log(user)
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
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
    if (user && user.comparePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
