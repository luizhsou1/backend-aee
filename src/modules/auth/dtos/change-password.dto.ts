import { IsUserPassword, IsUserPasswordConfirmation } from 'src/modules/users/attributes';

export class ChangePasswordDto {
  @IsUserPassword()
  password: string;

  @IsUserPasswordConfirmation()
  passwordConfirmation: string;
}
