import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dtos/base-query-parameters.dto';

export class FindSchoolsQueryDto extends BaseQueryParametersDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false, description: 'Default: true' })
  hasAee: string;
}
