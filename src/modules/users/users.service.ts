import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import { UserRepo } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepo)
    private readonly userRepo: UserRepo,
  ) { }

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    delete createUserDto.sourceSchool;
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userRepo.createUser(createUserDto, UserRole.ADMIN);
    }
  }

  async createSupervisorUser(createUserDto: CreateUserDto): Promise<User> {
    delete createUserDto.teacher;
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else if (!createUserDto.sourceSchool) {
      throw new ConflictException('Informe a escola de origem do supervisor');
    } else {
      return await this.userRepo.createUser(createUserDto, UserRole.SUPERVISOR);
    }
  }

  async createTeacherUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else if (!createUserDto.sourceSchool) {
      throw new ConflictException('Informe a escola de origem do professor');
    } else {
      return await this.userRepo.createUser(createUserDto, UserRole.TEACHER);
    }
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepo.findOne(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async updateAdminUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    delete updateUserDto.sourceSchool;
    await this.userRepo.updateUser(id, updateUserDto);
    return await this.findUserById(id);
  }

  async updateSupervisorUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    delete updateUserDto.teacher;
    await this.userRepo.updateUser(id, updateUserDto);
    return await this.findUserById(id);
  }

  async updateTeacherUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    await this.userRepo.updateUser(id, updateUserDto);
    return await this.findUserById(id);
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
