import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DeficienciesController } from './deficiencies.controller';
import { DeficienciesService } from './deficiencies.service';
import { DeficienciesRepo } from './deficiencies.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeficienciesRepo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DeficienciesController],
  providers: [DeficienciesService],
})
export class DeficienciesModule {}
