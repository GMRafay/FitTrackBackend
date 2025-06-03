import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkoutdayModule } from './workoutday/workoutday.module';
import { ExercisesModule } from './exercises/exercises.module';


@Module({
  imports: [AuthModule, UserModule, WorkoutdayModule, ExercisesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
