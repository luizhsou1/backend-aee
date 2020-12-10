import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { FindStudentsQueryDto } from './dtos/find-students-query.dto';
import { Student } from './student.entity';

@EntityRepository(Student)
export class StudentRepo extends Repository<Student> {
  async findStudents(
    queryDto: FindStudentsQueryDto,
  ): Promise<{ students: Student[]; total: number }> {
    const { name } = queryDto;
    const query = createQueryPaginationTypeorm(Student, 's', queryDto) as SelectQueryBuilder<Student>;
    query.leftJoinAndSelect('s.deficiencies', 'd')
      .leftJoinAndSelect('s.teachers', 't')
      .leftJoinAndSelect('s.supportTeacher', 'st')
      .leftJoinAndSelect('s.responsibles', 'r')
      .leftJoinAndSelect('s.documents', 'dd')
      .leftJoinAndSelect('s.extraAeeActivity', 'e')
      .leftJoinAndSelect('s.address', 'e')
      .where('1 = 1');

    if (name) {
      query.andWhere('unaccent(s.name) ILIKE unaccent(:name)', { name: `%${name}%` });
    }

    const [students, total] = await query.getManyAndCount();

    return { students, total };
  }
}
