import { IsUserEmail, IsUserPassword } from 'src/modules/users/attributes';

export class CredentialsDto {
  @IsUserEmail()
  email: string;

  @IsUserPassword()
  password: string;
}
