import { BaseQueryParametersDto } from 'src/shared/dtos/base-query-parameters.dto';

export class FindSchoolsQueryDto extends BaseQueryParametersDto {
  name: string;
  hasAee: string;
}
