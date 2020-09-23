import { BaseQueryParametersDto } from 'src/shared/dtos/base-query-parameters.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  search: string;
  name: string;
  email: string;
  active: string;
  role: string;
}
