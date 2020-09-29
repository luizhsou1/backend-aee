import { IsSchoolHasAee } from '../attributes/school-has-aee.decorator';
import { IsSchoolName } from '../attributes/school-name.decorator';

export class CreateSchoolDto {
  @IsSchoolName()
  name: string;

  @IsSchoolHasAee()
  hasAee: boolean;
}
