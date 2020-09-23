import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepo } from 'src/modules/users/users.repository';
import { CredentialsDto } from './dtos/credentials.dto';
import { ReturnSigninDto } from './dtos/return-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepo)
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(credentialsDto: CredentialsDto): Promise<ReturnSigninDto> {
    const user = await this.userRepo.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    delete user.password;
    delete user.salt;
    return { token, user };
  }
}
