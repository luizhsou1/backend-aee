import { Injectable, NotFoundException } from '@nestjs/common';
import { handleErrors } from '../../shared/utils/errors-helper';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { FindTeachersQueryDto } from './dtos/find-teachers-query.dto';
import { UpdateTeacherDto } from './dtos/update-teacher.dto';
import { Teacher } from './teacher.entity';
import { TeacherRepo } from './teachers.repository';

@Injectable()
export class TeachersService {
  constructor(private readonly teacherRepo: TeacherRepo) { }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = new Teacher();
    teacher.name = createTeacherDto.name;
    teacher.shiftsAee = createTeacherDto.shiftsAee;
    teacher.occupationArea = createTeacherDto.occupationArea;
    teacher.supportTeacher = createTeacherDto.supportTeacher;
    return await this.teacherRepo.save(teacher);
  }

  async findTeacherById(teacherId: string): Promise<Teacher> {
    const teacher = await this.teacherRepo.findOne(teacherId);

    if (!teacher) throw new NotFoundException('Professor não encontrado');

    return teacher;
  }

  async updateTeacher(updateTeacherDto: UpdateTeacherDto, id: string): Promise<Teacher> {
    try {
      const teacher = await this.findTeacherById(id);
      teacher.name = updateTeacherDto.name;
      teacher.shiftsAee = updateTeacherDto.shiftsAee;
      teacher.occupationArea = updateTeacherDto.occupationArea;
      teacher.supportTeacher = updateTeacherDto.supportTeacher;

      return await this.teacherRepo.save(teacher);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar escola');
    }
  }

  async deleteTeacher(teacherId: string) {
    const result = await this.teacherRepo.delete({ id: teacherId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um professor com o ID informado',
      );
    }
  }

  async findTeachers(
    queryDto: FindTeachersQueryDto,
  ): Promise<{ teachers: Teacher[]; total: number }> {
    const teachers = await this.teacherRepo.findTeachers(queryDto);
    return teachers;
  }
}
