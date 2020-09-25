import { UserRole } from '../user-roles.enum';
import { IsUserEmail, IsUserName, IsUserRole } from '../validations';
import { IsUserActive } from '../validations/user-active.decorator';

export class UpdateUserDto {
  @IsUserEmail(false)
  email: string;

  @IsUserName(false)
  name: string;

  @IsUserRole(false)
  role: UserRole;

  @IsUserActive(false)
  active: boolean;
}
