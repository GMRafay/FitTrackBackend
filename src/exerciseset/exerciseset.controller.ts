import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ExercisesetService } from './exerciseset.service';
import { JwtGuard } from '../auth/guard';
import { CreateExerciseSetDto } from './dto/create-exerciseset.dto';
import { GetUser } from '../auth/decorator';
@Controller('/workoutday/:workoutdayId/exercise/:exerciseId/exerciseset')
export class ExercisesetController {
    constructor(private exersizeSetService: ExercisesetService) {}

    @Post()
    @UseGuards(JwtGuard)
    @HttpCode(201)
    createExerciseSet(@Param('workoutdayId', ParseIntPipe) workoutdayId: number, @Param('exerciseId', ParseIntPipe) exerciseId: number, @Body() dto: CreateExerciseSetDto) {
        return this.exersizeSetService.createExerciseSet(workoutdayId, exerciseId,dto);
        // Logic to create an exercise set
    }

    @Get()
    @UseGuards(JwtGuard)
    @HttpCode(200)
    getExerciseSets(@GetUser('id') userId: number, @Param('workoutdayId', ParseIntPipe) workoutdayId: number, @Param('exerciseId', ParseIntPipe) exerciseId: number) {
        // Logic to get all exercise sets for an exercise
        return this.exersizeSetService.getExerciseSets(userId, workoutdayId, exerciseId);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @HttpCode(200)
    getExerciseSetById(@GetUser('id') userId: number, @Param('workoutdayId', ParseIntPipe) workoutdayId: number, @Param('exerciseId', ParseIntPipe) exerciseId: number, @Param('id', ParseIntPipe) exerciseSetId: number) {
        return this.exersizeSetService.getExerciseSetById(userId, workoutdayId, exerciseId, exerciseSetId);
        // Logic to get an exercise set by its ID
    }

    
    @Delete(':id')
    @UseGuards(JwtGuard)
    @HttpCode(204)
    deleteExerciseSet(@GetUser('id') userId: number, @Param('workoutdayId', ParseIntPipe) workoutdayId: number, @Param('exerciseId', ParseIntPipe) exerciseId: number, @Param('id', ParseIntPipe) exerciseSetId: number) {
        // Logic to delete an exercise set
        return this.exersizeSetService.deleteExerciseSet(userId, workoutdayId, exerciseId, exerciseSetId);
    }

}
