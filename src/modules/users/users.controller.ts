import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Headers, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRole } from './user-roles.enum';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('admin')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Post('supervisor')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createSupervisorUser(
    @Headers('schoolId') schoolId: string,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createSupervisorUser(createUserDto, schoolId);
    return {
      user,
      message: 'Supervisor cadastrado com sucesso',
    };
  }

  @Post('teacher')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createTeacherUser(
    @Headers('schoolId') schoolId: string,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createTeacherUser(createUserDto, schoolId);
    return {
      user,
      message: 'Professor cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch('admin/:id')
  @Auth(UserRole.ADMIN)
  async updateAdminUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.updateAdminUser(id, updateUserDto);
    return {
      user,
      message: 'Administrador alterado com sucesso',
    };
  }

  @Patch('supervisor/:id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async updateSupervisorUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.updateSupervisorUser(id, updateUserDto);
    return {
      user,
      message: 'Supervisor alterado com sucesso',
    };
  }

  @Patch('teacher/:id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async updateTeacherUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.updateTeacherUser(id, updateUserDto);
    return {
      user,
      message: 'Usuário alterado com sucesso',
    };
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }

  @Get()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findUsers(
    @Headers('schoolId') schoolId: string,
    @Query() query: FindUsersQueryDto,
  ) {
    const found = await this.usersService.findUsers(query, schoolId);
    return {
      ...found,
      message: 'Usuários encontrados',
    };
  }
}
