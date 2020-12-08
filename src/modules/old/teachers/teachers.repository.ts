import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { FindTeachersQueryDto } from './dtos/find-teachers-query.dto';
import { Teacher } from './teacher.entity';

@EntityRepository(Teacher)
export class TeacherRepo extends Repository<Teacher> {
  async findTeachers(
    queryDto: FindTeachersQueryDto,
  ): Promise<{ teachers: Teacher[]; total: number }> {
    const { name } = queryDto;
    const query = createQueryPaginationTypeorm(Teacher, 't', queryDto) as SelectQueryBuilder<Teacher>;
    query.leftJoinAndSelect('t.school', 's');
    query.leftJoinAndSelect('t.phones', 'p');

    query.where('1= 1');

    if (name) {
      query.andWhere('t.name ILIKE :name', { name: `%${name}%` });
    }

    const [teachers, total] = await query.getManyAndCount();

    return { teachers, total };
  }
}
