import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @Post()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);
    const role = this.convertRoleToPortuguese(createUserDto.role);
    return {
      user,
      message: `${role} cadastrado com sucesso`,
    };
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.updateUser(updateUserDto, id);
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
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.usersService.findUsers(query);
    return {
      ...found,
      message: 'Usuários encontrados',
    };
  }

  private convertRoleToPortuguese(role: UserRole): string {
    if (role === UserRole.ADMIN) {
      return 'Administrador';
    } if (role === UserRole.SUPERVISOR) {
      return 'Supervisor';
    } if (role === UserRole.TEACHER) {
      return 'Professor';
    }
  }
}
