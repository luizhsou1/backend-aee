import { UserRole } from '../user-roles.enum';

export class CreateUserDto {
  email: string;

  name: string;

  role: UserRole;

  password: string;

  passwordConfirmation: string;
}
