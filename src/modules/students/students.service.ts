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

  async createStudent(createStudentDto: CreateStudentDto, schoolId: string): Promise<Student> {
    return this.studentRepo.createStudent(createStudentDto, schoolId);
  }

  async findStudentById(studentId: string): Promise<Student> {
    const student = await this.studentRepo.findOne(studentId);

    if (!student) throw new NotFoundException('Estudante não encontrado');

    return student;
  }

  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return await this.studentRepo.updateStudent(id, updateStudentDto);
  }

  async deleteStudent(studentId: string) {
    const result = await this.studentRepo.delete({ id: studentId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um aluno com o ID informado',
      );
    }
  }

  async findStudents(
    queryDto: FindStudentsQueryDto,
    schoolId: string,
  ): Promise<{ students: Student[]; total: number }> {
    const students = await this.studentRepo.findStudents(queryDto, schoolId);
    return students;
  }
}
