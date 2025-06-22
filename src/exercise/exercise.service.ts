import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto';
import { EditExerciseDto } from './dto/edit-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {
    // Initialize any dependencies or services if needed
  }

  async createExercise(
    userId: number,
    workoutdayId: number,
    dto: CreateExerciseDto,
  ) {
    //check if workoutday is owned by user
    const workoutday = await this.prisma.workoutDay.findUnique({
      where: {
        id: workoutdayId,
      },
    });
    if (!workoutday) {
      throw new NotFoundException('Workout day not found');
    }
    if (workoutday.userId !== userId) {
      throw new ForbiddenException('Workout day does not belong to user');
    }
    const exercise = await this.prisma.exercise.create({
      data: {
        ...dto,
        workoutDayId: workoutdayId,
      },
    });
    return exercise;
  }

  async getExercises(userId: number, workoutdayId: number) {
    // Check if workoutday is owned by user
    const workoutday = await this.prisma.workoutDay.findUnique({
      where: {
        id: workoutdayId,
      },
    });
    // If workoutday does not exist, throw an error
    if (!workoutday) {
      throw new NotFoundException('Workout day not found');
    }
    // If workoutday does not belong to user, throw an error
    if (workoutday.userId !== userId) {
      throw new ForbiddenException('Workout day does not belong to user');
    }
    // If all good return the exercises
    const exercises = await this.prisma.exercise.findMany({
      where: {
        workoutDayId: workoutdayId,
      },
    });
    return exercises;
  }
  async getExerciseById(
    userId: number,
    workoutdayId: number,
    exerciseId: number,
  ) {
    // Check if workoutday exists and belongs to user
    const workoutday = await this.prisma.workoutDay.findUnique({
      where: {
        id: workoutdayId,
      },
    });
    if (!workoutday) {
      throw new NotFoundException('Workout day not found');
    }
    if (workoutday.userId !== userId) {
      throw new ForbiddenException('Workout day does not belong to user');
    }
    // Check if exercise exists in the workoutday
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id: exerciseId,
        workoutDayId: workoutdayId, // Ensure the exercise belongs to the specified workoutday
      },
    });
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return exercise; // Return the found exercise
  }
  async editExerciseById(
    userId: number,
    workoutdayId: number,
    exerciseId: number,
    dto: EditExerciseDto,
  ) {
    //Chekc if workout exists and belongs to the user
    const workoutday = await this.prisma.workoutDay.findUnique({
      where: {
        id: workoutdayId,
      },
    });
    if (!workoutday) {
      throw new NotFoundException('Workout day not found');
    }
    if (workoutday.userId !== userId) {
      throw new ForbiddenException('Workout day does not belong to user');
    }
    // Check if exercise exists in the workoutday
    const exercise = this.prisma.exercise.findUnique({
      where: {
        id: exerciseId,
        workoutDayId: workoutdayId, // Ensure the exercise belongs to the specified workoutday
      },
    });
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    // Update the exercise with the provided data
    const updatedExercise = await this.prisma.exercise.update({
      where: {
        id: exerciseId,
      },
      data: {
        ...dto,
      },
    });
    return updatedExercise; // Return the updated exercise
  }
  deleteExerciseById() {}
}
