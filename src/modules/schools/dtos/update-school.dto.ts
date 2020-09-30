import { IsSchoolHasAee } from '../attributes/school-has-aee.decorator';
import { IsSchoolName } from '../attributes/school-name.decorator';

export class UpdateSchoolDto {
  @IsSchoolName(false)
  name: string;

  @IsSchoolHasAee(false)
  hasAee: boolean;
}
