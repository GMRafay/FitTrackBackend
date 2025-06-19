import { Module } from '@nestjs/common';
import { ExercisesetController } from './exerciseset.controller';
import { ExercisesetService } from './exerciseset.service';

@Module({
  controllers: [ExercisesetController],
  providers: [ExercisesetService]
})
export class ExercisesetModule {}
