import {
  Controller,
  Get,
  UseGuards,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { WorkoutdayService } from './workoutday.service';
import { GetUser } from '../auth/decorator';
import { CreateWorkoutDayDto, EditWorkoutDayDto } from './dto';

@UseGuards(JwtGuard)
@Controller('workoutday')
export class WorkoutdayController {
  constructor(private workoutdayService: WorkoutdayService) {}

  @Get()
  getWorkoutDays(@GetUser('id') userId: number) {
    return this.workoutdayService.getWorkoutDays(userId);
  }

  @Post()
  createWorkoutDay(
    @GetUser('id') userId: number,
    @Body() dto: CreateWorkoutDayDto,
  ) {
    return this.workoutdayService.createWorkoutDay(userId, dto);
  }

  @Get(':id')
  getWorkoutDayById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) workoutdayId: number,
  ) {
    return this.workoutdayService.getWorkoutDayById(userId, workoutdayId);
  }

  @Patch(':id')
  editworkoutDayById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) workoutdayId: number,
    dto: EditWorkoutDayDto,
  ) {
    return this.workoutdayService.editworkoutDayById(userId, workoutdayId, dto);
  }

  @Delete(':id')
  deleteWorkoutDayById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) workoutdayId: number,
  ) {
    return this.workoutdayService.deleteWorkoutDayById(userId, workoutdayId);
  }
}
