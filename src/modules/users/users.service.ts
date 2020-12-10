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
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userRepo.createUser(createUserDto, UserRole.ADMIN);
    }
  }

  async createSupervisorUser(createUserDto: CreateUserDto, schoolId: string): Promise<User> {
    delete createUserDto.teacher;
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else if (!schoolId) {
      throw new ConflictException('Informe a escola de origem do supervisor');
    } else {
      return await this.userRepo.createUser(createUserDto, UserRole.SUPERVISOR, schoolId);
    }
  }

  async createTeacherUser(createUserDto: CreateUserDto, schoolId: string): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else if (!schoolId) {
      throw new ConflictException('Informe a escola de origem do professor');
    } else {
      return await this.userRepo.createUser(createUserDto, UserRole.TEACHER, schoolId);
    }
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userRepo.findUserByIdOrException(userId);
  }

  async updateAdminUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepo.updateUser(id, updateUserDto);
    return await this.findUserById(id);
  }

  async updateSupervisorUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    delete updateUserDto.teacher;
    await this.userRepo.updateUser(id, updateUserDto);
    return await this.findUserById(id);
  }

  async updateTeacherUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
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
    schoolId: string,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userRepo.findUsers(queryDto, schoolId);
    return users;
  }
}
