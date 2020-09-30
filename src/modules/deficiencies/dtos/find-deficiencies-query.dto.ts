import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dtos/base-query-parameters.dto';

export class FindDeficienciesQueryDto extends BaseQueryParametersDto {
  @ApiProperty({ required: false })
  name: string;
}
