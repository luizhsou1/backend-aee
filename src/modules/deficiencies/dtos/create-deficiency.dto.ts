import { IsDeficiencyDescription } from '../attributes/deficiency-description.decorator';
import { IsDeficiencyName } from '../attributes/deficiency-name.decorator';

export class CreateDeficiencyDto {
  @IsDeficiencyName()
  name: string;

  @IsDeficiencyDescription()
  description: string;
}
