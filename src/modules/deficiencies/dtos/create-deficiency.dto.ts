import { IsDeficiencyName } from '../attributes/deficiency-name.decorator';

export class CreateDeficiencyDto {
  @IsDeficiencyName()
  name: string;
}
