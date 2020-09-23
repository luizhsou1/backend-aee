import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepo } from 'src/modules/users/users.repository';
import { CredentialsDto } from './dtos/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepo)
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userRepo.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }
}
