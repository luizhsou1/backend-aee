import { ApiProperty } from '@nestjs/swagger';

export abstract class ObjectWithIdDto {
  @ApiProperty()
  id: string;
}
