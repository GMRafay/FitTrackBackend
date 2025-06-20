import { Injectable } from '@nestjs/common';
import { CreateWorkoutDayDto, EditWorkoutDayDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
@Injectable()
export class WorkoutdayService {
  constructor(private prisma: PrismaService) {}
  async getWorkoutDays(userId: number) {
    const workoutdays = await this.prisma.workoutDay.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return workoutdays;
  }

  async createWorkoutDay(userId: number, dto: CreateWorkoutDayDto) {
    const workoutday = await this.prisma.workoutDay.create({
      data: {
        title: dto.title,
        userId: userId,
      },
    });

    return workoutday;
  }

  async getWorkoutDayById(userId: number, workoutdayId: number) {
    const workoutday = await this.prisma.workoutDay.findFirst({
      where: {
        id: workoutdayId,
        userId: userId,
      },
    });
    if (!workoutday) {
      throw new NotFoundException(`Workout day ${workoutdayId} not found`);
    }
    return workoutday;
  }

  async editworkoutDayById(
    userId: number,
    workoutdayId: number,
    dto: EditWorkoutDayDto,
  ) {
    // get the workout day by id
    const workoutday = await this.prisma.workoutDay.findFirst({
      where: {
        id: workoutdayId,
      },
    });
    // check if workoutday belongs to the user
    if (!workoutday) {
      throw new NotFoundException(`Workout day ${workoutdayId} not found`);
    }
    if (workoutday.userId !== userId) {
      throw new ForbiddenException(`You can only edit your own workout days`);
    }
    // if all good, update the workoutday
    const updatedWorkoutDay = await this.prisma.workoutDay.update({
      where: {
        id: workoutdayId,
      },
      data: {
        title: dto.title,
      },
    });
    return updatedWorkoutDay;
  }

  async deleteWorkoutDayById(userId: number, workoutdayId: number) {
    // query the workoutday by id
    const workoutday = await this.prisma.workoutDay.findFirst({
      where: {
        id: workoutdayId,
        userId: userId,
      },
    });
    // check if the workoutday exists
    if (!workoutday) {
      throw new NotFoundException(`Workout day ${workoutdayId} not found`);
    }
    // check if the workoutday belongs to the user
    if (workoutday.userId !== userId) {
      throw new ForbiddenException(`You can only delete your own workout days`);
    }
    // if all good, delete the workoutday
    await this.prisma.workoutDay.delete({
      where: {
        id: workoutdayId,
      },
    });
  }
}
