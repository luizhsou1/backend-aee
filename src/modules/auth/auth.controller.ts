import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/users/get-user.decorator';
import { User } from 'src/modules/users/user.entity';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { UserRole } from '../users/user-roles.enum';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { ReturnSigninDto } from './dtos/return-signin.dto';
import { SendRecoverEmailDto } from './dtos/send-recover-email.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<ReturnSigninDto> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Post('/send-recover-email')
  async sendRecoverPasswordEmail(
    @Body(ValidationPipe) sendRecoverEmailDto: SendRecoverEmailDto,
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(sendRecoverEmailDto.email);
    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  @Patch('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(token, changePasswordDto);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @Patch(':id/change-password')
  @Auth()
  async changePassword(
    @Param('id') id: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    if (/* user.role !== UserRole.ADMIN && */user.id !== id) {
      throw new UnauthorizedException('Você não tem permissão para realizar esta operação');
    }

    await this.authService.changePassword(id, changePasswordDto);
    return {
      message: 'Senha alterada',
    };
  }

  @Get('/me')
  @Auth()
  getMe(@GetUser() user: User): User {
    return user;
  }
}
