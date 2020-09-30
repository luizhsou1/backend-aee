import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { CreateSchoolDto } from './dtos/create-school.dto';
import { FindSchoolsQueryDto } from './dtos/find-schools-query.dto';
import { UpdateSchoolDto } from './dtos/update-school.dto';
import { School } from './school.entity';
import { SchoolRepo } from './schools.repository';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(SchoolRepo)
    private readonly schoolRepo: SchoolRepo,
  ) { }

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = new School();
    school.name = createSchoolDto.name;
    school.hasAee = createSchoolDto.hasAee;
    return await this.schoolRepo.save(school);
  }

  async findSchoolById(schoolId: string): Promise<School> {
    const school = await this.schoolRepo.findOne(schoolId);

    if (!school) throw new NotFoundException('Escola não encontrada');

    return school;
  }

  async updateSchool(updateSchoolDto: UpdateSchoolDto, id: string): Promise<School> {
    try {
      await this.schoolRepo.update(id, updateSchoolDto);
      return await this.findSchoolById(id);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar usuário');
    }
  }

  async deleteSchool(schoolId: string) {
    const result = await this.schoolRepo.delete({ id: schoolId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado uma escola com o ID informado',
      );
    }
  }

  async findSchools(
    queryDto: FindSchoolsQueryDto,
  ): Promise<{ schools: School[]; total: number }> {
    const schools = await this.schoolRepo.findSchools(queryDto);
    return schools;
  }
}