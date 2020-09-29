import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { UserRole } from '../users/user-roles.enum';
import { CreateSchoolDto } from './dtos/create-school.dto';
import { ReturnSchoolDto } from './dtos/return-school.dto';
import { SchoolsService } from './schools.service';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) { }

  @Post()
  @Auth(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createSchoolDto: CreateSchoolDto,
  ): Promise<ReturnSchoolDto> {
    const school = await this.schoolsService.createSchool(createSchoolDto);
    return {
      school,
      message: 'Escola cadastrada com sucesso',
    };
  }
}
