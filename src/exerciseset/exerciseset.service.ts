import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseSetDto } from './dto/create-exerciseset.dto';


@Injectable()
export class ExercisesetService {
    constructor(private prismaService: PrismaService) {}

    async createExerciseSet(workoutdayId: number, exerciseId: number, dto: CreateExerciseSetDto) {
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
            throw new Error(`Exercise with ID ${exerciseId} does not belong to workout day with ID ${workoutdayId}`);
        }    
        const exersizeSet = await this.prismaService.exerciseSet.create({
            data: {
                ...dto,
                exerciseId: exerciseId,
            },
        });

        return exersizeSet;
    }
}
