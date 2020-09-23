import { IsUserEmail, IsUserPassword } from 'src/modules/users/validations';

export class CredentialsDto {
  @IsUserEmail()
  email: string;

  @IsUserPassword()
  password: string;
}
