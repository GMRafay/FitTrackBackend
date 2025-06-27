import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseSetDto } from './dto/create-exerciseset.dto';

@Injectable()
export class ExercisesetService {
  constructor(private prismaService: PrismaService) {}

  async createExerciseSet(
    workoutdayId: number,
    exerciseId: number,
    dto: CreateExerciseSetDto,
  ) {
    // Validate that the workoutdayId and exerciseId exist in the database
    const workoutday = await this.prismaService.workoutDay.findUnique({
      where: { id: workoutdayId },
    });
    if (!workoutday) {
      throw new Error(`Workout day with ID ${workoutdayId} not found`);
    }
    const exercise = await this.prismaService.exercise.findUnique({
      where: { id: exerciseId },
    });
    if (!exercise) {
      throw new Error(`Exercise with ID ${exerciseId} not found`);
    }
    // Validate that the exercise belongs to the workout day
    const exerciseInWorkoutDay = await this.prismaService.exercise.findFirst({
      where: {
        id: exerciseId,
        workoutDayId: workoutdayId,
      },
    });
    if (!exerciseInWorkoutDay) {
      throw new Error(
        `Exercise with ID ${exerciseId} does not belong to workout day with ID ${workoutdayId}`,
      );
    }
    const exersizeSet = await this.prismaService.exerciseSet.create({
      data: {
        ...dto,
        exerciseId: exerciseId,
      },
    });

    return exersizeSet;
  }

  async getExerciseSets(
    userId: number,
    workoutdayId: number,
    exerciseId: number,
  ) {
    // Validate that the workoutdayId and exerciseId exist in the database
    const workoutday = await this.prismaService.workoutDay.findUnique({
      where: { id: workoutdayId },
    });
    if (!workoutday) {
      throw new Error(`Workout day with ID ${workoutdayId} not found`);
    }
    const exercise = await this.prismaService.exercise.findUnique({
      where: { id: exerciseId },
    });
    if (!exercise) {
      throw new Error(`Exercise with ID ${exerciseId} not found`);
    }
    // Validate that the user owns the workout day
    if (workoutday.userId !== userId) {
      throw new Error(
        `User with ID ${userId} does not own workout day with ID ${workoutdayId}`,
      );
    }
    // Validate that the exercise belongs to the workout day
    const exerciseInWorkoutDay = await this.prismaService.exercise.findFirst({
      where: {
        id: exerciseId,
        workoutDayId: workoutdayId,
      },
    });
    if (!exerciseInWorkoutDay) {
      throw new Error(
        `Exercise with ID ${exerciseId} does not belong to workout day with ID ${workoutdayId}`,
      );
    }
    // Fetch all exercise sets for the given exercise
    const exerciseSets = await this.prismaService.exerciseSet.findMany({
      where: { exerciseId: exerciseId },
    });
    return exerciseSets;
  }

  async getExerciseSetById(
    userId: number,
    workoutdayId: number,
    exerciseId: number,
    exerciseSetId: number,
  ) {
    // Validate that the workoutdayId and exerciseId exist in the database
    const workoutday = await this.prismaService.workoutDay.findUnique({
      where: { id: workoutdayId },
    });
    if (!workoutday) {
      throw new Error(`Workout day with ID ${workoutdayId} not found`);
    }
    const exercise = await this.prismaService.exercise.findUnique({
      where: { id: exerciseId },
    });
    if (!exercise) {
      throw new Error(`Exercise with ID ${exerciseId} not found`);
    }

    // Validate that the user owns the workout day
    if (workoutday.userId !== userId) {
      throw new Error(
        `User with ID ${userId} does not own workout day with ID ${workoutdayId}`,
      );
    }
    // Validate that the exercise belongs to the workout day
    const exerciseInWorkoutDay = await this.prismaService.exercise.findFirst({
      where: {
        id: exerciseId,
        workoutDayId: workoutdayId,
      },
    });
    if (!exerciseInWorkoutDay) {
      throw new Error(
        `Exercise with ID ${exerciseId} does not belong to workout day with ID ${workoutdayId}`,
      );
    }
    // Fetch the exercise set by its ID
    const exerciseSet = await this.prismaService.exerciseSet.findUnique({
      where: {
        id: exerciseSetId,
        exerciseId: exerciseId, // Ensure the set belongs to the correct exercise
      },
    });
    if (!exerciseSet) {
      throw new Error(
        `Exercise set with ID ${exerciseSetId} not found for exercise with ID ${exerciseId}`,
      );
    }
    return exerciseSet;
  }

  async deleteExerciseSet(
    userId: number,
    workoutdayId: number,
    exerciseId: number,
    exerciseSetId: number,
  ) {
    // Validate that the workoutdayId and exerciseId exist in the database
    const workoutday = await this.prismaService.workoutDay.findUnique({
      where: { id: workoutdayId },
    });
    if (!workoutday) {
      throw new Error(`Workout day with ID ${workoutdayId} not found`);
    }
    const exercise = await this.prismaService.exercise.findUnique({
      where: { id: exerciseId },
    });
    if (!exercise) {
      throw new Error(`Exercise with ID ${exerciseId} not found`);
    }
    // Validate that the user owns the workout day
    if (workoutday.userId !== userId) {
      throw new Error(
        `User with ID ${userId} does not own workout day with ID ${workoutdayId}`,
      );
    }

    // Validate that the exercise belongs to the workout day
    const exerciseInWorkoutDay = await this.prismaService.exercise.findFirst({
      where: {
        id: exerciseId,
        workoutDayId: workoutdayId,
      },
    });
    if (!exerciseInWorkoutDay) {
      throw new Error(
        `Exercise with ID ${exerciseId} does not belong to workout day with ID ${workoutdayId}`,
      );
    }
    // Validate that the exercise set exists
    const exerciseSet = await this.prismaService.exerciseSet.findUnique({
      where: {
        id: exerciseSetId,
        exerciseId: exerciseId, // Ensure the set belongs to the correct exercise
      },
    });
    if (!exerciseSet) {
      throw new Error(
        `Exercise set with ID ${exerciseSetId} not found for exercise with ID ${exerciseId}`,
      );
    }
    // Delete the exercise set
    await this.prismaService.exerciseSet.delete({
      where: {
        id: exerciseSetId,
        exerciseId: exerciseId, // Ensure the set belongs to the correct exercise
      },
    });
    return {
      message: `Exercise set with ID ${exerciseSetId} deleted successfully`,
    };
  }
}
