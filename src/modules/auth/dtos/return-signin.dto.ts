import { User } from 'src/modules/users/user.entity';

export class ReturnSigninDto {
  token: string;
  user: User;
}
