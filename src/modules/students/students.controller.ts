import { Body, Controller, Post, ValidationPipe, Headers, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../shared/custom-decorators/auth.decorator';
import { UserRole } from '../users/user-roles.enum';
import { CreateStudentDto } from './dtos/create-student.dto';
import { FindStudentsQueryDto } from './dtos/find-students-query.dto';
import { ReturnStudentDto } from './dtos/return-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { StudentsService } from './students.service';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createStudent(
    @Headers('schoolId') schoolId: string,
    @Body(ValidationPipe) createStudentDto: CreateStudentDto,
  ): Promise<ReturnStudentDto> {
    const student = await this.studentsService.createStudent(createStudentDto, schoolId);
    return {
      student,
      message: 'Aluno cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.TEACHER)
  async findStudentById(@Param('id') id: string): Promise<ReturnStudentDto> {
    const student = await this.studentsService.findStudentById(id);
    return {
      student,
      message: 'Aluno encontrado',
    };
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async updateStudent(
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
    @Param('id') id: string,
  ): Promise<ReturnStudentDto> {
    const student = await this.studentsService.updateStudent(id, updateStudentDto);
    return {
      student,
      message: 'Aluno alterado com sucesso',
    };
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async deleteStudent(@Param('id') id: string) {
    await this.studentsService.deleteStudent(id);
    return {
      message: 'Aluno removido com sucesso',
    };
  }

  @Get()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.TEACHER)
  async findStudents(
    @Headers('schoolId') schoolId: string,
    @Query() query: FindStudentsQueryDto,
  ) {
    const found = await this.studentsService.findStudents(query, schoolId);
    return {
      ...found,
      message: 'Alunos encontrados',
    };
  }
}
