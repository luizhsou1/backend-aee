import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolDto } from './dtos/create-school.dto';
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
}
