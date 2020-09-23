import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/modules/users/get-user.decorator';
import { User } from 'src/modules/users/user.entity';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';
import { ReturnSigninDto } from './dtos/return-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<ReturnSigninDto> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get('/me')
  @Auth()
  getMe(@GetUser() user: User): User {
    return user;
  }
}
