import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard(), RolesGuard)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);
    const role = this.convertRoleToPortuguese(createUserDto.role);
    return {
      user,
      message: `${role} cadastrado com sucesso`,
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
