import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ExercisesetService } from './exerciseset.service';
import { JwtGuard } from '../auth/guard';
import { CreateExerciseSetDto } from './dto/create-exerciseset.dto';

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

    getExerciseSets() {
        // Logic to get all exercise sets for an exercise

    }

    getExerciseSetById() {
        // Logic to get an exercise set by its ID
    }

    editExerciseSet() {
        // Logic to edit an exercise set
    }

    deleteExerciseSet() {
        // Logic to delete an exercise set
    }

}
