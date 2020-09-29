import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { UserRepo } from 'src/modules/users/users.repository';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { ReturnSigninDto } from './dtos/return-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepo)
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
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

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userRepo.findOne({ email });

    if (!user) {
      throw new NotFoundException('Não há usuário cadastrado com esse email.');
    }

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();

    const mail = {
      to: user.email,
      from: 'projetoaee.tcc@gmail.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: user.recoverToken,
      },
    };
    await this.mailerService.sendMail(mail);
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password, passwordConfirmation } = changePasswordDto;

    if (password !== passwordConfirmation) { throw new UnprocessableEntityException('As senhas não conferem'); }

    await this.userRepo.changePassword(id, password);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userRepo.findOne(
      { recoverToken },
      {
        select: ['id'],
      },
    );
    if (!user) throw new NotFoundException('Token inválido.');

    await this.changePassword(user.id.toString(), changePasswordDto);
  }
}
