import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dtos/base-query-parameters.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiProperty({ required: false, description: 'Procura por nome ou email' })
  search: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  active: string;

  @ApiProperty({ required: false })
  role: string;
}
