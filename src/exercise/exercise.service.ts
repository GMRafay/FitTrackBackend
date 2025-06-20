import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto';

@Injectable()
export class ExerciseService {
    constructor(private prisma: PrismaService) {
        // Initialize any dependencies or services if needed
    }

    async createExercise(userId: number, workoutdayId: number,dto: CreateExerciseDto) {
        //check if workoutday is owned by user
        const workoutday = await this.prisma.workoutDay.findUnique({
            where: {
                id: workoutdayId,},
        });
        if(!workoutday) {
            throw new NotFoundException('Workout day not found');
        }
        if (workoutday.userId !== userId) {
            throw new ForbiddenException('Workout day does not belong to user');
        }
        const exercise = await this.prisma.exercise.create({
            data: {
                ...dto,
                workoutDayId: workoutdayId,
            }
        });
        return exercise;
    }
    
    async getExercises(userId:number, workoutdayId: number) {
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
    getExerciseById() {}
    editExerciseById() {}
    deleteExerciseById() {}

}
