import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { CredentialsDto } from 'src/modules/auth/dtos/credentials.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepo extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password, role } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    user.role = role;

    try {
      await user.save();
      delete user.salt;
      delete user.password;
      return user;
    } catch (error) {
      handleErrors(error, 'Erro ao salvar usuário');
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;

    const user = await this.createQueryBuilder('u')
      .addSelect('u.password')
      .addSelect('u.salt')
      .where('u.active = :active', { active: true })
      .andWhere('u.email = :email', { email })
      .getOne();

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }
}
