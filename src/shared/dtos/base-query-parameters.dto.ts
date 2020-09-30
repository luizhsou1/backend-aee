import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseQueryParametersDto {
  @ApiProperty({ required: false })
  sort: string;

  @ApiProperty({ required: false, description: 'Default: 1' })
  page: number;

  @ApiProperty({ required: false, description: 'Default: 100' })
  limit: number;
}

// exemplo de um objeto com as informações de ordenação para me enviar via frontend
// const sort = {
//   name: 'ASC',
//   email: 'DESC',
// };

// const sortString = JSON.stringify(sort);
// sortString => "{\"name\":\"ASC\",\"email\":\"DESC\"}"
