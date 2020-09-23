import { UserRole } from '../user-roles.enum';
import { IsUserEmail, IsUserName, IsUserRole } from '../validations';
import { IsUserActive } from '../validations/user-active.decorator';

export class UpdateUserDto {
  @IsUserEmail(true)
  email: string;

  @IsUserName(true)
  name: string;

  @IsUserRole(true)
  role: UserRole;

  @IsUserActive(true)
  active: boolean;
}
