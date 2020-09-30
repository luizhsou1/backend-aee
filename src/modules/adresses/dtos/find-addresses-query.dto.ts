import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dtos/base-query-parameters.dto';

export class FindAddressesQueryDto extends BaseQueryParametersDto {
  @ApiProperty({ required: false, description: 'Procura por descrição, cep, cidade, bairro ou rua' })
  search: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  city: string;

  @ApiProperty({ required: false })
  cep: string;

  @ApiProperty({ required: false })
  neighborhood: string;

  @ApiProperty({ required: false })
  street: string;
}
