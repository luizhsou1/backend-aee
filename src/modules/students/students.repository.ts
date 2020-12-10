import { ConflictException } from '@nestjs/common';
import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { handleErrors } from '../../shared/utils/errors-helper';
import { School } from '../schools/school.entity';
import { CreateStudentDto } from './dtos/create-student.dto';
import { FindStudentsQueryDto } from './dtos/find-students-query.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { Student } from './student.entity';

@EntityRepository(Student)
export class StudentRepo extends Repository<Student> {
  async findStudents(
    queryDto: FindStudentsQueryDto,
    schoolId: string,
  ): Promise<{ students: Student[]; total: number }> {
    const { name } = queryDto;
    const query = createQueryPaginationTypeorm(Student, 's', queryDto) as SelectQueryBuilder<Student>;
    query.leftJoinAndSelect('s.deficiencies', 'd')
      .leftJoinAndSelect('s.teachers', 't')
      .leftJoinAndSelect('s.supportTeacher', 'st')
      .leftJoinAndSelect('s.responsibles', 'r')
      .leftJoinAndSelect('s.documents', 'dd')
      .leftJoinAndSelect('s.address', 'e')
      .where('s."sourceSchoolId" ILIKE :sourceSchoolId', { sourceSchoolId: schoolId });

    if (name) {
      query.andWhere('unaccent(s.name) ILIKE unaccent(:name)', { name: `%${name}%` });
    }

    const [students, total] = await query.getManyAndCount();

    return { students, total };
  }

  async createStudent(createStudentDto: CreateStudentDto, schoolId: string): Promise<Student> {
    const student = new Student();
    student.name = createStudentDto.name;
    student.aeeRegistration = createStudentDto.aeeRegistration;
    student.regularRegistration = createStudentDto.regularRegistration;
    student.birthDate = createStudentDto.birthDate;
    student.gender = createStudentDto.gender;
    student.address = createStudentDto.address;
    student.deficiencies = createStudentDto.deficiencies;
    student.regularShift = createStudentDto.regularShift;
    student.regularClassYear = createStudentDto.regularClassYear;
    student.regularClass = createStudentDto.regularClass;
    student.regularClassRoom = createStudentDto.regularClassRoom;
    student.aeeClass = createStudentDto.aeeClass;
    student.teachers = createStudentDto.teachers;
    student.supportTeacher = createStudentDto.supportTeacher;
    student.extraAeeActivity = createStudentDto.extraAeeActivity;
    student.address = createStudentDto.address;
    student.sourceSchool = { id: schoolId } as School;

    // Para sempre criar um novo
    createStudentDto.responsibles = createStudentDto.responsibles.map((responsible) => {
      delete responsible.id;
      return responsible;
    });
    student.responsibles = createStudentDto.responsibles;

    createStudentDto.documents = createStudentDto.documents.map((document) => {
      delete document.id;
      return document;
    });
    student.documents = createStudentDto.documents;

    try {
      return await this.save(student);
    } catch (error) {
      handleErrors(error, 'Erro ao salvar aluno');
    }
  }

  /**
   * @throws ConflictException (Caso não encontre o aluno)
   */
  async findStudentByIdOrException(id: string): Promise<Student> {
    const student = await this.findOne(id);

    if (!student) throw new ConflictException('Aluno não encontrado');

    return student;
  }

  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    try {
      const student = await this.findStudentByIdOrException(id);
      student.name = updateStudentDto.name;
      student.aeeRegistration = updateStudentDto.aeeRegistration;
      student.regularRegistration = updateStudentDto.regularRegistration;
      student.birthDate = updateStudentDto.birthDate;
      student.gender = updateStudentDto.gender;
      student.address = updateStudentDto.address;
      student.deficiencies = updateStudentDto.deficiencies;
      student.regularShift = updateStudentDto.regularShift;
      student.regularClassYear = updateStudentDto.regularClassYear;
      student.regularClass = updateStudentDto.regularClass;
      student.regularClassRoom = updateStudentDto.regularClassRoom;
      student.aeeClass = updateStudentDto.aeeClass;
      student.teachers = updateStudentDto.teachers;
      student.supportTeacher = updateStudentDto.supportTeacher;
      student.extraAeeActivity = updateStudentDto.extraAeeActivity;
      student.address = updateStudentDto.address;
      student.responsibles = updateStudentDto.responsibles;
      student.documents = updateStudentDto.documents;

      return await this.save(student);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar aluno');
    }
  }
}
