import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleErrors } from '../../shared/utils/errors-helper';
import { CreateStudentDto } from './dtos/create-student.dto';
import { FindStudentsQueryDto } from './dtos/find-students-query.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { Student } from './student.entity';
import { StudentRepo } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentRepo)
    private readonly studentRepo: StudentRepo,
  ) { }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new Student();
    student.name = createStudentDto.name;
    student.address = createStudentDto.address;
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

    return await this.studentRepo.save(student);
  }

  async findStudentById(studentId: string): Promise<Student> {
    const student = await this.studentRepo.findOne(studentId);

    if (!student) throw new NotFoundException('Estudante não encontrado');

    return student;
  }

  async updateStudent(updateStudentDto: UpdateStudentDto, id: string): Promise<Student> {
    try {
      const student = await this.findStudentById(id);
      student.name = updateStudentDto.name;
      student.address = updateStudentDto.address;
      // student.phones = updateStudentDto.phones;
      return await this.studentRepo.save(student);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar escola');
    }
  }

  async deleteStudent(studentId: string) {
    const result = await this.studentRepo.delete({ id: studentId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um estudante com o ID informado',
      );
    }
  }

  async findStudents(
    queryDto: FindStudentsQueryDto,
  ): Promise<{ students: Student[]; total: number }> {
    const students = await this.studentRepo.findStudents(queryDto);
    return students;
  }
}
