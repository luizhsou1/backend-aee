import { IsDeficiencyDescription } from '../attributes/deficiency-description.decorator';
import { IsDeficiencyName } from '../attributes/deficiency-name.decorator';

export class UpdateDeficiencyDto {
  @IsDeficiencyName(false)
  name: string;

  @IsDeficiencyDescription(false)
  description: string;
}
