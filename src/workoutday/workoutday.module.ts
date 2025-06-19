import { Module } from '@nestjs/common';
import { WorkoutdayController } from './workoutday.controller';
import { WorkoutdayService } from './workoutday.service';

@Module({
  controllers: [WorkoutdayController],
  providers: [WorkoutdayService]
})
export class WorkoutdayModule {}
