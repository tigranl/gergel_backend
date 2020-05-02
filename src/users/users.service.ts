import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './interfaces/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUsers(): Promise<any> {
    return await this.userRepository.find();
  }

  public async getByEmail(userEmail: string): Promise<any | undefined> {
    return await this.userRepository.findOne({email: userEmail});
  }

  public async getByid(id: number): Promise<any | undefined> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async getByUsername(username: string): Promise<any | undefined> {
    return await this.userRepository.findOne({where: {username}});
  }

  public async createUser(newUser: UserDto): Promise<any> {
    const { email } = newUser;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  public async updateUser(id: number, user: UserDto): Promise<any> {
    return await this.userRepository.update(id, user);
  }

  public async deleteUser(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

}
