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

    query.where('s.hasAee = :hasAee', {
      hasAee: (hasAee === '' || hasAee === null || hasAee === undefined || hasAee === 'true') ? 'true' : 'false',
    });

    if (name) {
      query.andWhere('s.name ILIKE :name', { name: `%${name}%` });
    }

    const [schools, total] = await query.getManyAndCount();

    return { schools, total };
  }
}
