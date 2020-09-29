import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { CredentialsDto } from 'src/modules/auth/dtos/credentials.dto';
import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';

@EntityRepository(User)
export class UserRepo extends Repository<User> {
  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const { search, email, name, active, role } = queryDto;
    const query = createQueryPaginationTypeorm(User, 'u', queryDto) as SelectQueryBuilder<User>;

    query.where('u.active = :active', {
      active: (active === '' || active === null || active === undefined || active === 'true') ? 'true' : 'false',
    });

    if (search) {
      query.andWhere('(u.email ILIKE :email OR u.name ILIKE :name)', {
        email: `%${search}%`,
        name: `%${search}%`,
      });
    } else {
      if (email) {
        query.andWhere('u.email ILIKE :email', { email: `%${email}%` });
      }

      if (name) {
        query.andWhere('u.name ILIKE :name', { name: `%${name}%` });
      }

      if (role) {
        query.andWhere('u.role = :role', { role });
      }
    }

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password, role } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
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

  async changePassword(id: string, password: string) {
    const user = await this.findOne(id);
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.recoverToken = null;
    await user.save();
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

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
