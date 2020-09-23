import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/role.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
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