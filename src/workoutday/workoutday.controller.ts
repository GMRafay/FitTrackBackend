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
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutdayService } from './workoutday.service';
import { GetUser } from '../auth/decorator';
import { CreateWorkoutDayDto } from './dto';

@UseGuards(JwtGuard)
@Controller('workoutday')
export class WorkoutdayController {
  constructor(private workoutdayService: WorkoutdayService) {}

  @Get()
  getWorkoutDays(@GetUser('id') userId: number) {}

  @Post()
  createWorkoutDay(
    @GetUser('id') userId: number,
    @Body() dto: CreateWorkoutDayDto,
  ) {}

  @Get(':id')
  getWorkoutDayById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) workoutdayId: number,
  ) {}

  @Patch(':id')
  editworkoutDayById(@GetUser('id') userId: number) {}

  @Delete(':id')
  deleteWorkoutDayById(@GetUser('id') userId: number) {}
}
