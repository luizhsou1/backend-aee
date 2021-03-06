import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { FindSchoolsQueryDto } from './dtos/find-schools-query.dto';
import { School } from './school.entity';

@EntityRepository(School)
export class SchoolRepo extends Repository<School> {
  async findSchools(
    queryDto: FindSchoolsQueryDto,
  ): Promise<{ schools: School[]; total: number }> {
    const { name, hasAee } = queryDto;
    const query = createQueryPaginationTypeorm(School, 's', queryDto) as SelectQueryBuilder<School>;
    query.leftJoinAndSelect('s.address', 'a')
      .leftJoinAndSelect('s.phones', 'p')
      .where('1 = 1');

    if (hasAee) {
      query.andWhere('s.hasAee = :hasAee', { hasAee });
    }

    if (name) {
      query.andWhere('unaccent(s.name) ILIKE unaccent(:name)', { name: `%${name}%` });
    }

    const [schools, total] = await query.getManyAndCount();

    return { schools, total };
  }
}
