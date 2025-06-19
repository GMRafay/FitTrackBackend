import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsObject,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreateExerciseDto } from '../../exercise/dto/create-exercise.dto';
export class CreateWorkoutDayDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}
