import { IsUserEmail, IsUserPassword } from 'src/modules/users/attributes';

export class SendRecoverEmailDto {
  @IsUserEmail()
  email: string;
}
