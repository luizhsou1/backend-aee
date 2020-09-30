import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { UserRole } from '../users/user-roles.enum';
import { CreateSchoolDto } from './dtos/create-school.dto';
import { FindSchoolsQueryDto } from './dtos/find-schools-query.dto';
import { ReturnSchoolDto } from './dtos/return-school.dto';
import { UpdateSchoolDto } from './dtos/update-school.dto';
import { SchoolsService } from './schools.service';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) { }

  @Post()
  @Auth(UserRole.ADMIN)
  async createSchool(
    @Body(ValidationPipe) createSchoolDto: CreateSchoolDto,
  ): Promise<ReturnSchoolDto> {
    const school = await this.schoolsService.createSchool(createSchoolDto);
    return {
      school,
      message: 'Escola cadastrada com sucesso',
    };
  }

  @Get(':id')
  @Auth(UserRole.ADMIN)
  async findSchoolById(@Param('id') id: string): Promise<ReturnSchoolDto> {
    const school = await this.schoolsService.findSchoolById(id);
    return {
      school,
      message: 'Escola encontrada',
    };
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  async updateSchool(
    @Body(ValidationPipe) updateSchoolDto: UpdateSchoolDto,
    @Param('id') id: string,
  ): Promise<ReturnSchoolDto> {
    const school = await this.schoolsService.updateSchool(updateSchoolDto, id);
    return {
      school,
      message: 'Escola alterada com sucesso',
    };
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async deleteSchool(@Param('id') id: string) {
    await this.schoolsService.deleteSchool(id);
    return {
      message: 'Escola removida com sucesso',
    };
  }

  @Get()
  @Auth(UserRole.ADMIN)
  async findSchools(@Query() query: FindSchoolsQueryDto) {
    const found = await this.schoolsService.findSchools(query);
    return {
      ...found,
      message: 'Escolas encontradas',
    };
  }
}
