import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Deficiency } from './deficiency.entity';
import { FindDeficienciesQueryDto } from './dtos/find-deficiencies-query.dto';

@EntityRepository(Deficiency)
export class DeficienciesRepo extends Repository<Deficiency> {
  async findDeficiencies(
    queryDto: FindDeficienciesQueryDto,
  ): Promise<{ deficiencies: Deficiency[]; total: number }> {
    const { name } = queryDto;
    const query = createQueryPaginationTypeorm(Deficiency, 'd', queryDto) as SelectQueryBuilder<Deficiency>;

    if (name) {
      query.where('unaccent(d.name) ILIKE unaccent(:name)', { name: `%${name}%` });
    }

    const [deficiencies, total] = await query.getManyAndCount();

    return { deficiencies, total };
  }
}
