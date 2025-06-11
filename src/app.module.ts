import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkoutdayModule } from './workoutday/workoutday.module';

import { ExerciseModule } from './exercise/exercise.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    WorkoutdayModule,
    ExerciseModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
