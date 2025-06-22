import { Body, Controller, Param, ParseIntPipe } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Post, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateExerciseDto } from './dto';
import { GetUser } from '../auth/decorator';
@Controller('/workoutday/:workoutdayId/exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  // Define methods for handling requests related to exercises
  @UseGuards(JwtGuard)
  @Post()
  createExercise(
    @GetUser('id') userId: number,
    @Param('workoutdayId', ParseIntPipe) workoutdayId: number,
    @Body() dto: CreateExerciseDto,
  ) {
    return this.exerciseService.createExercise(userId, workoutdayId, dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getExercises(
    @GetUser('id') userId: number,
    @Param('workoutdayId', ParseIntPipe) workoutdayId: number,
  ) {
    return this.exerciseService.getExercises(userId, workoutdayId);
  }

  @UseGuards(JwtGuard)
  @Get(':exerciseId')
  getExerciseById(
    @GetUser('id') userId: number,
    @Param('workoutdayId', ParseIntPipe) workoutdayId: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ) {
    return this.exerciseService.getExerciseById(
      userId,
      workoutdayId,
      exerciseId,
    );
  }
  editExerciseById() {}
  deleteExerciseById() {}
}
