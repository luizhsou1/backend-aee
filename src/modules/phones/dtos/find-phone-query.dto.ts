import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dtos/base-query-parameters.dto';

export class FindPhonesQueryDto extends BaseQueryParametersDto {
  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  phoneNumber: string;
}
