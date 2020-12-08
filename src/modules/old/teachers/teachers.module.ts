import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from './teachers.controller';
import { TeacherRepo } from './teachers.repository';
import { TeachersService } from './teachers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherRepo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
