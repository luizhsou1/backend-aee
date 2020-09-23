import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserRepo } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepo)
    private userRepo: UserRepo,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepo.createUser(createUserDto);
    }
  }
}
