import { Injectable } from '@nestjs/common';
import { CreateWorkoutDayDto, EditWorkoutDayDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class WorkoutdayService {
  constructor(private prisma: PrismaService) {}
  getWorkoutDays() {}

  async createWorkoutDay(userId: number, dto: CreateWorkoutDayDto) {
    const workoutday = await this.prisma.workoutDay.create({
      data: {
        title: dto.title,
        userId: userId,
      },
    });
  }

  async getWorkoutDayById(userId: number, workoutdayId: number) {
    const workoutday = await this.prisma.workoutDay.findFirst({
      where: {
        id: workoutdayId,
        userId: userId,
      },
    });
    if (!workoutday) {
      throw new Error('Workout day not found');
    }
    return workoutday;
  }

  async editworkoutDayById(
    userId: number,
    workoutdayId: number,
    dto: EditWorkoutDayDto,
  ) {
    const workoutday = await this.prisma.workoutDay.update({
      where: {
        id: workoutdayId,
        userId: userId,
      },
      data: {
        title: dto.title,
      },
    });

    if (!workoutday) {
      throw new Error('Workout day not found');
    }
    return workoutday;
  }

  deleteWorkoutDayById() {}
}
