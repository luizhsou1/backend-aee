import { IsDeficiencyName } from '../attributes/deficiency-name.decorator';

export class UpdateDeficiencyDto {
  @IsDeficiencyName(false)
  name: string;
}
