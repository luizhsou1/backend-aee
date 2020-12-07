import { UserRole } from '../user-roles.enum';
import { IsUserEmail, IsUserName, IsUserRole } from '../attributes';
import { IsUserActive } from '../attributes/user-active.decorator';

export class UpdateUserDto {
  @IsUserEmail(false)
  email: string;

  @IsUserName(false)
  name: string;

  @IsUserActive(false)
  active: boolean;
}
