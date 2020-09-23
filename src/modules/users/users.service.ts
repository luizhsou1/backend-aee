import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserRepo } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepo)
    private readonly userRepo: UserRepo,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepo.createUser(createUserDto);
    }
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepo.findOne(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    try {
      await this.userRepo.update(id, updateUserDto);
      return await this.findUserById(id);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar usuário');
    }
  }

  async deleteUser(userId: string) {
    const result = await this.userRepo.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userRepo.findUsers(queryDto);
    return users;
  }
}
