import { UserRole } from '../user-roles.enum';
import { IsUserEmail, IsUserName, IsUserRole, IsUserPassword, IsUserPasswordConfirmation } from '../validations';

export class CreateUserDto {
  @IsUserEmail()
  email: string;

  @IsUserName()
  name: string;

  @IsUserRole()
  role: UserRole;

  @IsUserPassword()
  password: string;

  @IsUserPasswordConfirmation()
  passwordConfirmation: string;
}